import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL, NotificationType } from "@/consts";
import { handleGetNotification } from "@/store/notification.store";
import { formatDate } from "@/lib/utils";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { handleFollow, handleUnFollow } from "@/store/user.store";
import useFetchData from "@/hooks/useFetchData";
import { io } from "socket.io-client";

const Notifications = ({
  isShowNotifications,
  setIsShowNotifications,
  setIsSmall,
}: {
  isShowNotifications: boolean;
  isSmall: boolean;
  setIsShowNotifications: any;
  setIsSmall: any;
}) => {
  const { pathname } = useLocation();
  const { user } = useSelector((state: any) => state.user);
  const [following, setFollowing] = useState<string[]>([]);
  const token = localStorage.getItem("token");
  const { data: notifications, isLoading } = useFetchData<NotificationType[]>(
    "notifications",
    handleGetNotification
  );
  const socket = io(BASE_URL);

  useEffect(() => {
    if (notifications) {
      setFollowing(user?.following || []);
    }
  }, [notifications]);

  useEffect(() => {
    setIsShowNotifications(false);
    setIsSmall(false);
  }, [pathname]);

  function handleFollowClick(id: string, token: string | null, myId: string) {
    if (!token) return;

    setFollowing([...following, id]);

    handleFollow(id, token)
      .then(() => {
        socket.emit("sendFollowNotification", {
          sender_id: myId,
          receiver_id: id,
        });
      })
      .catch((err) => {
        console.log(err);
        setFollowing(following.filter((follower) => follower !== id));
      });
  }

  function handleUnFollowClick(id: string, token: string | null) {
    if (!token) return;

    setFollowing(following.filter((follower) => follower !== id));

    handleUnFollow(id, token)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setFollowing([...following, id]);
      });
  }

  return (
    <div
      className={`overflow-y-auto pb-5 shadow-2xl z-10 rounded-2xl transition-all duration-200 transform ${
        !isShowNotifications
          ? "-translate-x-[700px] w-0 h-full"
          : "-translate-x-4 w-[410px]"
      } bg-white`}
    >
      <div className="pb-5 flex flex-col mb-2">
        <h3 className="py-3 my-2 pl-10 text-2xl font-medium">Уведомления</h3>
      </div>

      <div className="pl-10 pr-5">
        {isLoading ? (
          <Loader className="h-[60vh]" />
        ) : !isLoading && notifications?.length === 0 ? (
          <div className="h-[60vh] text-center flex justify-center items-center">
            <p className="text-xl font-bold text-[#737373]">
              Пока нет уведомлений
            </p>
          </div>
        ) : (
          notifications?.map((notification) =>
            notification.type === "follow" ? (
              <div className="flex gap-2 items-center mb-3 justify-between">
                <div className="flex gap-1 flex-1">
                  <div className="flex-none">
                    <Avatar size="sm" src={notification.sender.profile_img} />
                  </div>

                  <p className="text-sm">
                    <Link
                      to={`/${notification.sender.username}`}
                      className="font-semibold"
                    >
                      {notification.sender.username}
                    </Link>{" "}
                    подписался(-ась) на ваши обновления.
                    <span className="text-[#8E8E8E]">
                      {" "}
                      {formatDate(new Date(notification.updatedAt))}
                    </span>
                  </p>
                </div>

                {following.includes(notification.sender._id) ? (
                  <button
                    onClick={() =>
                      handleUnFollowClick(notification.sender._id, token)
                    }
                    className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black font-semibold px-2 !py-1 !rounded-lg text-sm"
                  >
                    Отписаться
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      handleFollowClick(notification.sender._id, token, user.id)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 !py-1 !rounded-lg text-sm"
                  >
                    Подписаться
                  </button>
                )}
              </div>
            ) : notification.type === "like" ? (
              <div className="flex gap-2 items-center mb-3 justify-between">
                <div className="flex gap-1 flex-1">
                  <div className="flex-none">
                    <Avatar size="sm" src={notification.sender.profile_img} />
                  </div>

                  <p className="text-sm">
                    <Link
                      to={`/${notification.sender.username}`}
                      className="font-semibold"
                    >
                      {notification.sender.username}
                    </Link>{" "}
                    поставил(-а) "Нравится" вашей публикации.
                    <span className="text-[#8E8E8E]">
                      {" "}
                      {formatDate(new Date(notification.updatedAt))}
                    </span>
                  </p>
                </div>

                <Link to={`/p/${notification.post?._id}`}>
                  <img
                    src={notification?.post?.image}
                    alt="public"
                    className="w-11 h-11 rounded object-cover object-center"
                  />
                </Link>
              </div>
            ) : (
              <div className="flex gap-2 items-center mb-3 justify-between">
                <div className="flex gap-1 flex-1">
                  <div className="flex-none">
                    <Avatar size="sm" src={notification.sender.profile_img} />
                  </div>

                  <p className="text-sm">
                    <Link
                      to={`/${notification.sender.username}`}
                      className="font-semibold"
                    >
                      {notification.sender.username}
                    </Link>{" "}
                    прокомментировал ваше публикации: {notification.comment}.
                    <span className="text-[#8E8E8E]">
                      {" "}
                      {formatDate(new Date(notification.updatedAt))}
                    </span>
                  </p>
                </div>

                <Link to={`/p/${notification.post?._id}`}>
                  <img
                    src={notification?.post?.image}
                    alt="public"
                    className="w-11 h-11 rounded object-cover object-center"
                  />
                </Link>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Notifications;
