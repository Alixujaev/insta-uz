import Avatar from "@/components/Avatar";
import me from "@/assets/images/my.jpg";
import { Link } from "react-router-dom";
import PostDialog from "@/components/dialogs/PostDialog";
import my from "@/assets/images/me.jpg";
import BaseIcon from "@/components/icon/BaseIcon";

const Post = () => {
  return (
    <div className="w-[470px] ">
      <div className="py-[7px] flex justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar src={me} size="sm" />

          <Link to="/" className="text-sm font-semibold">
            lewishamilton
          </Link>

          <p className="text-[#8E8E8E] text-sm">• 5h</p>
        </div>
        <PostDialog />
      </div>
      <img
        src={my}
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
          20,000 отметок "Нравится"
        </p>
        <p className="text-sm mb-1.5">
          <span className="font-semibold mr-1">lewishamilton</span>Parabéns
          Ayrton, minha inspiração sempre 🇧🇷💫
        </p>

        <p className="text-sm text-[#8E8E8E] cursor-pointer mb-1.5">
          Посмотреть все комментарии (23)
        </p>

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
