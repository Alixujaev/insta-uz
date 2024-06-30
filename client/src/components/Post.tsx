import Avatar from "@/components/Avatar";
import me from "@/assets/images/my.jpg";
import { Link } from "react-router-dom";
import PostDialog from "@/components/dialogs/PostDialog";
import BaseIcon from "@/components/icon/BaseIcon";
import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

const Post = ({ post }: any) => {
  const [saveds, setSaveds] = useState<string[]>([]);

  console.log(post);

  return (
    <div className="w-[470px] ">
      <div className="py-[7px] flex justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar src={me} size="sm" />

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
          <button>
            <BaseIcon name="notifications" />
          </button>
          <button>
            <BaseIcon name="comment" />
          </button>
          <button>
            <BaseIcon name="share" />
          </button>
        </div>

        <button>
          <BaseIcon name="saved" />
        </button>
      </div>
      <div className="border-b border-[#dbdbdb] pb-2 mb-3">
        <p className="text-sm font-semibold mb-1.5">
          {post.likes.length} отметок "Нравится"
        </p>
        <p className="text-sm mb-1.5">
          <span className="font-semibold mr-1">{post.author.username}</span>{" "}
          {post.description}
        </p>

        {post.comments.length ? (
          <p className="text-sm text-[#8E8E8E] cursor-pointer mb-1.5">
            Посмотреть все комментарии ({post.comments.length})
          </p>
        ) : (
          <p className="text-sm text-[#8E8E8E] cursor-pointer mb-1.5">
            Нет комментариев
          </p>
        )}

        <div className="relative w-full h-4 mb-2">
          <input
            type="text"
            placeholder="Add a comment…"
            className="absolute w-full outline-none"
          />

          <button className="absolute right-0 top-1">
            <BaseIcon name="emoji" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
