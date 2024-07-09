import { updatePosts } from "@/actions/settingsActions";
import Avatar from "@/components/Avatar";
import Comment from "@/components/Comment";
import AreYouSure from "@/components/dialogs/AreYouSure";
import PostDialog from "@/components/dialogs/PostDialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { BASE_URL, CommentType, PostType } from "@/consts";
import useClickOutside from "@/hooks/useClickOutside";
import { formatDate } from "@/lib/utils";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import {
  comment,
  handleDelete,
  handleGetComments,
  handleGetPost,
  like,
  save,
  unlike,
} from "@/store/post.store";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { handleGetUser } from "@/store/user.store";
import Loader from "@/components/Loader";
import { io } from "socket.io-client";

const Post = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentLoad, setCommentLoad] = useState<boolean>(false);
  const [post, setPost] = useState<PostType>({} as PostType);
  const token = localStorage.getItem("token");
  const [user] = useLocalStorage<{ id: string; saved: string[] }>("user", {
    id: "",
    saved: [],
  });
  const [likes, setLikes] = useState<string[]>([]);
  const [saveds, setSaveds] = useState<string[]>([...user.saved]);
  const [commentText, setCommentText] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const navigate = useNavigate();
  const emojiRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const socket = io(BASE_URL);

  useClickOutside(emojiRef, () => setShowEmoji(false));

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    handleGetPost(id)
      .then((res) => {
        setPost(res.data.data);
        setLikes(res.data.data.likes);
        handleGetUser(res.data.data.author.username)
          .then((res) => {
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
            setError(true);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });

    handleGetComments(id)
      .then((res) => {
        setComments(res.data.data);
      })
      .catch((err) => {
        setError(true);

        console.log(err);
      });
  }, [id]);

  function handleDeletePost(id: string, token: string | null) {
    if (!token) return;

    handleDelete(id, token)
      .then((res) => {
        dispatch(updatePosts());
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex justify-center">
      {isLoading || !post.author ? (
        <Loader className="h-screen" />
      ) : error || !post ? (
        <div>Пост не найден</div>
      ) : (
        <div className="!max-w-[910px] w-full max-h-[568px] h-full !rounded-md !py-0 !px-0 !gap-0 flex my-16">
          <img
            src={post.image}
            alt="post image"
            className=" !w-[411px] object-cover"
          />

          <div className="flex-1 py-2 flex flex-col justify-between">
            <div className="pb-4 pt-2 px-3 flex justify-between !w-full border-b">
              <div className="flex items-center gap-1.5">
                <Avatar src={post.author.profile_img} size="sm" />

                <Link
                  to={`/${post.author.username}`}
                  className="text-sm font-semibold"
                >
                  {post.author.username}
                </Link>
              </div>
              <PostDialog
                id={id || ""}
                author={post.author}
                saveds={saveds}
                setSaveds={setSaveds}
              />
            </div>
            <div className="flex-1 p-3 border-b overflow-y-auto">
              <Comment
                authorImage={post.author.profile_img}
                text={post.description}
                authorName={post.author.username}
                createdAt={new Date(post.createdAt)}
              />

              {comments.length ? (
                comments.map((comment: CommentType) => (
                  <Comment
                    key={comment.post_id}
                    authorImage={comment.author.profile_img}
                    text={comment.comment}
                    authorName={comment.author.username}
                    createdAt={new Date(comment.createdAt)}
                  />
                ))
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center">
                  <h3 className="text-2xl font-bold">Комментариев нет</h3>
                  <p>Начните переписку.</p>
                </div>
              )}
            </div>
            <div>
              <div className="p-3 border-b">
                <div className="mb-4 flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    {likes.includes(user.id) ? (
                      <button
                        onClick={() =>
                          unlike(post._id, token, setLikes, likes, user.id)
                        }
                      >
                        <BaseIcon
                          name="heart_red"
                          viewBox="0 0 24 24"
                          width={32}
                          height={32}
                          color="red"
                        />
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          like(
                            post._id,
                            token,
                            setLikes,
                            likes,
                            user.id,
                            post.author._id,
                            socket
                          )
                        }
                      >
                        <BaseIcon
                          name="heart"
                          viewBox="0 0 24 24"
                          width={32}
                          height={32}
                        />
                      </button>
                    )}
                    <button>
                      <label htmlFor="comment" className="cursor-pointer">
                        <BaseIcon name="comment" />
                      </label>
                    </button>
                    <button>
                      <BaseIcon name="share" />
                    </button>
                  </div>

                  {saveds.includes(post._id) ? (
                    <button
                      onClick={() => save(post._id, token, saveds, setSaveds)}
                    >
                      <BaseIcon name="saved_active" />
                    </button>
                  ) : (
                    <button
                      onClick={() => save(post._id, token, saveds, setSaveds)}
                    >
                      <BaseIcon name="saved" />
                    </button>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm mb-1">
                    {likes.length} отметок "Нравится"
                  </p>
                  <p className="text-[#8E8E8E] text-xs">
                    {formatDate(new Date(post.createdAt))}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-between m-3 relative">
                <button onClick={() => setShowEmoji(!showEmoji)}>
                  <BaseIcon name="smilek" cn=" cursor-pointer mr-1" />
                </button>
                {showEmoji ? (
                  <div className="absolute -top-[450px]" ref={emojiRef}>
                    <Picker
                      data={data}
                      onEmojiSelect={(emoji: any) =>
                        setCommentText(commentText + emoji.native)
                      }
                    />
                  </div>
                ) : null}
                <input
                  id="comment"
                  type="text"
                  className="flex-1 outline-none text-sm"
                  placeholder="Добавить комментарий"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                {!commentText.length || commentLoad ? (
                  <button className="font-medium text-sm text-[#8E8E8E] cursor-default">
                    Опубликовать
                  </button>
                ) : (
                  <button
                    className="font-medium text-sm text-blue-500"
                    onClick={() =>
                      comment(
                        { comment: commentText, postId: post._id },
                        token,
                        setCommentLoad,
                        setComments,
                        setCommentText,
                        setShowEmoji,
                        user.id,
                        post.author._id,
                        socket,
                        comments
                      )
                    }
                  >
                    Опубликовать
                  </button>
                )}
              </div>
            </div>
            <AreYouSure
              type="post"
              fn={() => handleDeletePost(post._id, token)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
