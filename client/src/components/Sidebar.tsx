import Logo from "@/assets/icons/instagram-text-logo.png";
import instagram from "@/assets/images/instagram.png";
import { Link, useLocation } from "react-router-dom";
import BaseIcon from "./icon/BaseIcon";
import userImg from "@/assets/images/user.jpg";
import CreatePost from "./dialogs/CreatePost";
import More from "./dropdowns/More";
import { useEffect, useState } from "react";
import Search from "./Search";
import Notifications from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { setNotify } from "@/actions/userActions";
import { BASE_URL } from "@/consts";

const Sidebar = () => {
  const { notify, user } = useSelector((state: any) => state.user);
  const [isSmall, setIsSmall] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowNotifications, setIsShowNotifications] = useState(false);
  const [notifyTime, setNotifyTime] = useState<number>(0);
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState(pathname);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.includes("direct")) {
      setIsSmall(true);
    }
  }, [pathname]);

  useEffect(() => {
    if (!notify) return;

    if (notify.receiver_id === user.id) {
      setNotifyTime(5);
    }
  }, [notify]);

  useEffect(() => {
    let timerId: any;

    if (notifyTime <= 0) return;

    if (notifyTime > 0) {
      timerId = setTimeout(() => {
        setNotifyTime(notifyTime - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [notifyTime]);

  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("register", user.id);

    const handleNotify = (data: any) => {
      if (data.receiver_id === user.id) {
        localStorage.setItem("notify", JSON.stringify(data));
      }
      dispatch(setNotify(data));
    };

    socket.on("getFollowNotification", handleNotify);
    socket.on("getLikeNotification", handleNotify);
    socket.on("getCommentNotification", handleNotify);

    // return () => {
    //   socket.disconnect();
    // };
  }, [user]);

  const handleClickSearch = () => {
    if (pathname.includes("direct") || !isSmall || isShowNotifications) {
      setIsSmall(true);
    } else {
      setTimeout(() => setIsSmall(false), 200);
    }
    setIsShowSearch(!isShowSearch);
    setIsShowNotifications(false);
  };

  const handleClickNotify = () => {
    if (pathname.includes("direct") || !isSmall || isShowSearch) {
      setIsSmall(true);
    } else {
      setTimeout(() => setIsSmall(false), 200);
    }
    localStorage.removeItem("notify");
    setIsShowNotifications(!isShowNotifications);
    setIsShowSearch(false);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <div className={`h-screen fixed top-0 left-0 flex z-50`}>
      <div
        className={`${
          isSmall ? "w-20" : "w-64"
        } border-r border-[#8e8e8e68] flex flex-col justify-between z-50 bg-white transition duration-300 `}
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
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md ${
                activeLink === "/" ? "font-bold" : ""
              }`}
              to="/"
              onClick={() => handleLinkClick("/")}
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
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md ${
                activeLink === "/explore" ? "font-bold" : ""
              }`}
              to="/explore"
              onClick={() => handleLinkClick("/explore")}
            >
              <BaseIcon name="explore" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Интересное</span>
              ) : null}
            </Link>

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md ${
                activeLink === "/reels" ? "font-bold" : ""
              }`}
              to="/reels"
              onClick={() => handleLinkClick("/reels")}
            >
              <BaseIcon name="reels" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Reels</span>
              ) : null}
            </Link>

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md`}
              to="/direct/inbox"
              onClick={() => handleLinkClick("/direct/inbox")}
            >
              <BaseIcon name="messages" />
              {!isSmall ? (
                <span className="whitespace-nowrap">Сообщения</span>
              ) : null}
            </Link>

            <div
              onClick={handleClickNotify}
              className={`relative py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md cursor-pointer ${
                isShowNotifications ? "border" : ""
              }`}
            >
              <BaseIcon name="notifications" />
              {!isSmall ? (
                <span className={`whitespace-nowrap `}>Уведомления</span>
              ) : null}

              {localStorage.getItem("notify") ? (
                <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-3 left-8"></div>
              ) : null}

              <div
                className={`absolute bg-red-500 rounded-lg py-1 px-3 transition-all transform -right-10 ${
                  notifyTime > 0 && !isSmall ? "scale-100" : "scale-0"
                }`}
              >
                <div className="flex items-center gap-.5">
                  {notify.event === "follow" ? (
                    <BaseIcon
                      name="user"
                      color="white"
                      viewBox="0 0 30 30"
                      cn="mt-2"
                      width={22}
                      height={22}
                    />
                  ) : notify.event === "like" ? (
                    <BaseIcon
                      name="white_heart"
                      color="white"
                      viewBox="0 0 28 28"
                      cn="mt-2"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <BaseIcon
                      name="white_comment"
                      color="white"
                      viewBox="0 0 45 45"
                      cn="mt-2"
                      width={22}
                      height={22}
                    />
                  )}

                  <p className=" text-white font-semibold">1</p>
                </div>
              </div>
            </div>

            <CreatePost isSmall={isSmall} />

            <Link
              className={`py-3 p-3.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md ${
                activeLink === `/${user.username}` ? "font-bold" : ""
              }`}
              to={`/${user.username}`}
              onClick={() => handleLinkClick(`/${user.username}`)}
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

      <Search
        isShowSearch={isShowSearch}
        isSmall={isSmall}
        setIsSmall={setIsSmall}
        setIsShowSearch={setIsShowSearch}
      />

      <Notifications
        isSmall={isSmall}
        setIsSmall={setIsSmall}
        isShowNotifications={isShowNotifications}
        setIsShowNotifications={setIsShowNotifications}
      />
    </div>
  );
};

export default Sidebar;
