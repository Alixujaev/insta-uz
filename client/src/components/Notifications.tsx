import { handleSearchUsers } from "@/store/user.store";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { NotificationType } from "@/consts";
import { handleGetNotification } from "@/store/notification.store";
import { useSelector } from "react-redux";

const Notifications = ({
  isShowNotifications,
  isSmall,
  setIsShowNotifications,
  setIsSmall,
}: {
  isShowNotifications: boolean;
  isSmall: boolean;
  setIsShowNotifications: any;
  setIsSmall: any;
}) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !isShowNotifications) return;

    handleGetNotification(token).then((res) => {});
  }, [isShowNotifications]);

  return (
    <div
      className={` shadow-2xl z-10 rounded-2xl transition-all duration-200 transform ${
        !isShowNotifications
          ? "-translate-x-[700px] w-0 h-full"
          : "-translate-x-4 w-[410px]"
      } bg-white`}
    >
      <div className="pb-5 flex flex-col mb-2">
        <h3 className="py-3 my-2 pl-10 text-2xl font-medium">Уведомления</h3>
      </div>

      <div className="pl-10 pr-5">
        <div className="flex gap-2 items-center mb-3">
          <Avatar size="sm" />
          <p className="text-sm">
            <span className="font-semibold">isl0m.ali</span> подписался(-ась) на
            ваши обновления.
            <span className="text-[#8E8E8E]"> 2 часа назад</span>
          </p>

          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 !py-1 !rounded-lg h-8">
            Подписаться
          </Button>
        </div>

        <div className="flex gap-2 items-center">
          <Avatar size="sm" />
          <p className="text-sm">
            <span className="font-semibold">isl0m.ali</span> поставил(-а)
            "Нравится" вашей публикации.
            <span className="text-[#8E8E8E]"> 2 часа назад</span>
          </p>

          <img
            src="https://picsum.photos/200"
            alt="public"
            className="w-11 h-11 rounded object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
