import Logo from "@/assets/icons/instagram-text-logo.png";
import { Link } from "react-router-dom";
import BaseIcon from "./icon/BaseIcon";
import { useLocalStorage } from "usehooks-ts";
import { UserType } from "@/consts";
import userImg from "@/assets/images/user.jpg";
import CreatePost from "./dialogs/CreatePost";

const Sidebar = () => {
  const [user] = useLocalStorage<UserType>("user", {
    id: "",
    email: "",
    username: "",
    full_name: "",
    password: "",
    followers: [],
    following: [],
    posts: [],
    stories: [],
    profile_img: "",
  });
  return (
    <div className="w-64 h-screen fixed top-0 left-0 border-r border-[#8e8e8e68] flex flex-col justify-between">
      <div>
        <img
          src={Logo}
          alt="logo icon"
          className="w-28 my-6 ml-6 cursor-pointer"
        />

        <div className="flex flex-col mx-3">
          <Link
            className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
            to="/"
          >
            <BaseIcon name="home" />
            <span className="">Главная</span>
          </Link>

          <div className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer">
            <BaseIcon name="search" />
            <span className="">Поисковый запрос</span>
          </div>

          <Link
            className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
            to="/explore"
          >
            <BaseIcon name="explore" />
            <span className="">Интересное</span>
          </Link>

          <Link
            className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
            to="/reels"
          >
            <BaseIcon name="reels" />
            <span className="">Reels</span>
          </Link>

          <Link
            className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
            to="/direct/inbox"
          >
            <BaseIcon name="messages" />
            <span className="">Сообщения</span>
          </Link>

          <div className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer">
            <BaseIcon name="notifications" />
            <span className="">Уведомления</span>
          </div>

          {/* <div className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer">
            <BaseIcon name="add" />
            <span className="">Создать</span>
          </div> */}

          <CreatePost />

          <Link
            className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
            to="/profile"
          >
            {user.profile_img ? (
              <img
                src={user.profile_img}
                alt="image"
                className="w-6 h-6 rounded-full"
              />
            ) : (
              <img src={userImg} alt="image" className="w-6 h-6 rounded-full" />
            )}
            <span className="">Профиль</span>
          </Link>
        </div>
      </div>

      <div className="ml-3 flex gap-4 items-center px-3.5 mb-10">
        <BaseIcon name="more" />

        <p>Ещё</p>
      </div>
    </div>
  );
};

export default Sidebar;
