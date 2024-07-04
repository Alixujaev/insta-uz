import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { NotificationType } from "@/consts";
import { handleGetNotification } from "@/store/notification.store";
import { formatDate } from "@/lib/utils";
import Loader from "./Loader";

const Notifications = ({
  isShowNotifications,
}: {
  isShowNotifications: boolean;
  isSmall: boolean;
  setIsShowNotifications: any;
  setIsSmall: any;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !isShowNotifications) return;

    setIsLoading(true);

    handleGetNotification(token)
      .then((res) => {
        setNotifications(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [isShowNotifications]);

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
        {isLoading ? <Loader className="h-[60vh]" /> : null}

        {!isLoading && notifications.length === 0 ? (
          <p className="text-center text-sm">Нет уведомлений</p>
        ) : null}

        {notifications.map((notification) =>
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

              <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 !py-1 !rounded-lg text-sm">
                Подписаться
              </button>
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
        )}
      </div>
    </div>
  );
};

export default Notifications;
