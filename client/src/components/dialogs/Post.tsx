import { BASE_URL, CommentType, PostType } from "@/consts";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import BaseIcon from "../icon/BaseIcon";
import Avatar from "../Avatar";
import { Link, useNavigate } from "react-router-dom";
import PostDialog from "./PostDialog";
import Comment from "../Comment";
import { formatDate } from "@/lib/utils";
import {
  comment,
  handleDelete,
  handleGetComments,
  like,
  save,
  unlike,
} from "@/store/post.store";
import { useLocalStorage } from "usehooks-ts";
import { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useClickOutside from "@/hooks/useClickOutside";
import AreYouSure from "./AreYouSure";
import { useDispatch } from "react-redux";
import { updatePosts } from "@/actions/settingsActions";
import { io } from "socket.io-client";
const socket = io(BASE_URL);

const Post = ({
  post,
  triggerComponent,
}: {
  post: PostType;
  triggerComponent?: any;
}) => {
  const token = localStorage.getItem("token");
  const [open, setOpen] = useState<boolean>(false);
  const [user] = useLocalStorage<{ id: string; saved: string[] }>("user", {
    id: "",
    saved: [],
  });
  const [likes, setLikes] = useState<string[]>([...post.likes]);
  const [saveds, setSaveds] = useState<string[]>([...user.saved]);
  const [commentText, setCommentText] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const emojiRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useClickOutside(emojiRef, () => setShowEmoji(false));

  useEffect(() => {
    if (open) {
      handleGetComments(post._id)
        .then((res) => {
          setComments(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [post._id, open]);

  function handleDeletePost(id: string, token: string | null) {
    if (!token) return;

    setOpen(false);

    handleDelete(id, token)
      .then(() => {
        setOpen(false);
        dispatch(updatePosts());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {triggerComponent ? (
          triggerComponent
        ) : (
          <div className="group cursor-pointer w-full !h-[309px] relative">
            <img
              src={post.image}
              alt="image"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute hidden top-0 left-0 w-full h-full bg-[#00000056] group-hover:flex justify-center items-center gap-10">
              <div className="flex gap-2 text-white items-center">
                <BaseIcon
                  name="white_heart"
                  viewBox="0 0 24 24"
                  width={32}
                  height={32}
                  color="white"
                />
                <p className="font-semibold text-lg">{likes.length}</p>
              </div>
              <div className="flex gap-2 text-white items-center">
                <BaseIcon
                  name="white_comment"
                  cn="h-fit"
                  viewBox="0 0 42 42"
                  width={32}
                  height={32}
                />
                <p className="font-semibold text-lg">{post.comments.length}</p>
              </div>
            </div>
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="!max-w-[910px] w-full max-h-[568px] h-full !rounded-md !py-0 !px-0 !gap-0 flex">
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
              author={post.author}
              id={post._id}
              setPostOpen={setOpen}
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
                          post.author_id,
                          socket,
                          navigate
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
                    onClick={() =>
                      save(post._id, token, saveds, setSaveds, navigate)
                    }
                  >
                    <BaseIcon name="saved_active" />
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      save(post._id, token, saveds, setSaveds, navigate)
                    }
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
              {!commentText.length || isLoading ? (
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
                      setIsLoading,
                      setComments,
                      setCommentText,
                      setShowEmoji,
                      user.id,
                      post.author_id,
                      socket,
                      comments,
                      navigate
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
      </DialogContent>
    </Dialog>
  );
};

export default Post;
