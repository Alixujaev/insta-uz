import { PostType, UserType } from "@/consts";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import BaseIcon from "../icon/BaseIcon";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import PostDialog from "./PostDialog";
import Comment from "../Comment";
import { formatDate } from "@/lib/utils";
import { handleLike, handleUnLike } from "@/store/post.store";
import { useLocalStorage } from "usehooks-ts";
import { useState } from "react";

const Post = ({ post, author }: { post: PostType; author: UserType }) => {
  const token = localStorage.getItem("token");
  const [user] = useLocalStorage("user", "");
  const [likes, setLikes] = useState<string[]>([...post.likes]);

  function like(id: string, token: string | null) {
    if (!token) return;

    handleLike(id, token)
      .then((res) => {
        setLikes([...likes, user.id]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function unlike(id: string, token: string | null) {
    if (!token) return;

    handleUnLike(id, token)
      .then((res) => {
        setLikes(likes.filter((like) => like !== user.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Dialog>
      <DialogTrigger>
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
              <BaseIcon name="white_comment" cn="h-fit" />
              <p className="font-semibold text-lg">{post.comments.length}</p>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="!max-w-[910px] w-full max-h-[568px] h-full !rounded-md !py-0 !px-0 !gap-0 flex">
        <img
          src={post.image}
          alt="post image"
          className="h-full !w-[411px] object-contain"
        />

        <div className="flex-1 py-2 flex flex-col justify-between">
          <div className="pb-4 pt-2 px-3 flex justify-between !w-full border-b">
            <div className="flex items-center gap-1.5">
              <Avatar src={author.profile_img} size="sm" />

              <Link
                to={`/${author.username}`}
                className="text-sm font-semibold"
              >
                {author.username}
              </Link>
            </div>
            <PostDialog />
          </div>
          <div className="flex-1 p-3 border-b">
            <Comment
              authorImage={author.profile_img}
              text={post.description}
              authorName={author.username}
              createdAt={new Date(post.createdAt)}
            />
          </div>
          <div>
            <div className="p-3 border-b">
              <div className="mb-4 flex justify-between items-center">
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

                <button>
                  <BaseIcon name="saved" />
                </button>
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

            <div className="flex gap-2 justify-between m-3">
              <BaseIcon name="smilek" cn=" cursor-pointer mr-1" />
              <input
                type="text"
                className="flex-1 outline-none text-sm"
                placeholder="Добавить комментарий"
              />
              <button className="font-medium text-sm text-blue-500">
                Опубликовать
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Post;
