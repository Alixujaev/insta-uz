import Logo from "@/assets/icons/instagram-text-logo.png";
import instagram from "@/assets/images/instagram.png";
import { Link } from "react-router-dom";
import BaseIcon from "./icon/BaseIcon";
import { useLocalStorage } from "usehooks-ts";
import { UserType } from "@/consts";
import userImg from "@/assets/images/user.jpg";
import CreatePost from "./dialogs/CreatePost";
import More from "./dropdowns/More";
import { useState } from "react";

const Sidebar = () => {
  const [isSmall, setIsSmall] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
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
    about: "",
  });

  function handleClickSearch() {
    setIsSmall(!isSmall);
    setIsShowSearch(!isShowSearch);
  }

  return (
    <div className=" h-screen fixed top-0 left-0 flex">
      <div
        className={`${
          isSmall ? "w-20" : "w-64"
        } border-r border-[#8e8e8e68] flex flex-col justify-between z-10 bg-white transition duration-300 `}
      >
        <div>
          {isSmall ? (
            <img
              src={instagram}
              alt="logo icon"
              className="w-6 my-[43px] ml-7 cursor-pointer"
            />
          ) : (
            <img
              src={Logo}
              alt="logo icon"
              className="w-28 my-6 ml-6 cursor-pointer"
            />
          )}

          <div className="flex flex-col mx-3">
            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to="/"
            >
              <BaseIcon name="home" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Главная</span>
              ) : null}
            </Link>

            <div
              onClick={handleClickSearch}
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer ${
                isShowSearch ? "border" : ""
              }`}
            >
              <BaseIcon name="search" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Поисковый запрос</span>
              ) : null}
            </div>

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to="/explore"
            >
              <BaseIcon name="explore" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Интересное</span>
              ) : null}
            </Link>

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to="/reels"
            >
              <BaseIcon name="reels" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Reels</span>
              ) : null}
            </Link>

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to="/direct/inbox"
            >
              <BaseIcon name="messages" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Сообщения</span>
              ) : null}
            </Link>

            <div
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer`}
            >
              <BaseIcon name="notifications" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Уведомления</span>
              ) : null}
            </div>

            <CreatePost isSmall={isSmall} />

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to={`/${user.username}`}
            >
              {user.profile_img?.trim() ? (
                <img
                  src={user.profile_img}
                  alt="image"
                  className="w-6 h-6 rounded-full object-cover "
                />
              ) : (
                <img
                  src={userImg}
                  alt="image"
                  className="w-6 h-6 rounded-full"
                />
              )}
              {!isSmall ? (
                <span className="whitespace-nowrap">Профиль</span>
              ) : null}
            </Link>
          </div>
        </div>

        <More isSmall={isSmall} />
      </div>

      <div
        className={`w-[410px] shadow-2xl rounded-2xl transition-all duration-300 transform ${
          !isShowSearch ? "-translate-x-[500px]" : "-translate-x-4"
        } bg-white`}
      >
        <div className="pb-5 border-b flex flex-col">
          <h3 className="pt-3 pb-9 my-2 pl-10 text-2xl font-medium">
            Поисковый запрос
          </h3>

          <input
            type="text"
            placeholder="Поиск"
            className="ml-8 p-2 bg-[#efefef] rounded-lg text-sm outline-none mr-5 !h-10"
          />
        </div>

        <div className="py-5 px-8">
          <p className="font-semibold">Недавнее</p>

          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-sm text-[#8E8E8E]">Нет недавних запросов.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
