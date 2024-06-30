import Avatar from "@/components/Avatar";
import { Link, useNavigate } from "react-router-dom";
import PostDialog from "@/components/dialogs/PostDialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { useRef, useState } from "react";
import { formatDate } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { CommentBodyType, UserType } from "@/consts";
import {
  handleComment,
  handleLike,
  handleSavePost,
  handleUnLike,
} from "@/store/post.store";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Post from "./dialogs/Post";

const PostComponent = ({ post }: any) => {
  const emojiRef = useRef<HTMLDivElement>(null);
  const [user] = useLocalStorage("user", {} as UserType);
  const [saveds, setSaveds] = useState<string[]>([...user.saved]);
  const [likes, setLikes] = useState<string[]>([...post.likes]);
  const [comments, setComments] = useState<string[]>([...post.comments]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>("");
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  function like(id: string, token: string | null) {
    if (!token) return;

    setLikes([...likes, user.id]);

    handleLike(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLikes(likes.filter((like) => like !== user.id));
      });
  }

  function unlike(id: string, token: string | null) {
    if (!token) return;

    setLikes(likes.filter((like) => like !== user.id));

    handleUnLike(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLikes([...likes, user.id]);
      });
  }

  function comment(body: CommentBodyType, token: string | null) {
    if (!token) return;

    setIsLoading(true);
    handleComment(body, token)
      .then((res) => {
        setCommentText("");
        setShowEmoji(false);
        setComments([...comments, res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }

  function handleSave(id: string, token: string | null) {
    if (!token) return;

    if (saveds.includes(id)) {
      setSaveds(saveds.filter((saved) => saved !== id));
    } else {
      setSaveds([...saveds, id]);
    }

    handleSavePost(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (saveds.includes(id)) {
          setSaveds([...saveds, id]);
        } else {
          setSaveds(saveds.filter((saved) => saved !== id));
        }
      });
  }

  return (
    <div className="w-[470px] ">
      <div className="py-[7px] flex justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar src={post.author.profile_img} size="sm" />

          <Link
            to={`/${post.author.username}`}
            className="text-sm font-semibold"
          >
            {post.author.username}
          </Link>

          <p className="text-[#8E8E8E] text-sm">
            • {formatDate(new Date(post.createdAt))}
          </p>
        </div>
        <PostDialog
          author={post.author}
          saveds={saveds}
          setSaveds={setSaveds}
          id={post._id}
        />
      </div>
      <img
        src={post.image}
        alt="post image"
        className="max-h-[585px] object-cover object-center w-full"
      />
      <div className="py-3 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          {likes.includes(user.id) ? (
            <button onClick={() => unlike(post._id, token)}>
              <BaseIcon
                name="heart_red"
                viewBox="0 0 24 24"
                width={32}
                height={32}
                color="red"
              />
            </button>
          ) : (
            <button onClick={() => like(post._id, token)}>
              <BaseIcon
                name="heart"
                viewBox="0 0 24 24"
                width={32}
                height={32}
              />
            </button>
          )}
          <button>
            <BaseIcon name="comment" />
          </button>
          <button>
            <BaseIcon name="share" />
          </button>
        </div>

        {saveds.includes(post._id) ? (
          <button onClick={() => handleSave(post._id, token)}>
            <BaseIcon name="saved_active" />
          </button>
        ) : (
          <button onClick={() => handleSave(post._id, token)}>
            <BaseIcon name="saved" />
          </button>
        )}
      </div>
      <div className="border-b border-[#dbdbdb] pb-2 mb-3">
        <p className="text-sm font-semibold mb-1.5">
          {likes.length} отметок "Нравится"
        </p>
        <p className="text-sm mb-1.5">
          <span className="font-semibold mr-1">{post.author.username}</span>{" "}
          {post.description}
        </p>

        {comments.length ? (
          <Post
            key={post.id}
            post={post}
            triggerComponent={
              <p className="text-sm text-[#8E8E8E] cursor-pointer mb-1.5">
                Посмотреть все комментарии ({comments.length})
              </p>
            }
          />
        ) : (
          <p className="text-sm text-[#8E8E8E] cursor-pointer mb-1.5">
            Нет комментариев
          </p>
        )}

        <div className="flex gap-2 justify-between m-3 relative">
          <button onClick={() => setShowEmoji(!showEmoji)}>
            <BaseIcon name="smilek" cn=" cursor-pointer mr-1 -ml-3" />
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
                comment({ comment: commentText, postId: post._id }, token)
              }
            >
              Опубликовать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
