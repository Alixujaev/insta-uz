import ChatList from "@/components/ChatList";
import ChatRoom from "@/components/ChatRoom";
import DirectSearchUser from "@/components/dialogs/DirectSearchUser";
import BaseIcon from "@/components/icon/BaseIcon";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const Direct = () => {
  const { chatId } = useParams();
  const { user } = useSelector((state: any) => state.user);
  const socket = useRef<any>();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (!socket.current) return;

    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users: any) => {
      console.log(users);
    });
  }, [user]);

  return (
    <div className="flex">
      <ChatList />

      {chatId ? (
        <ChatRoom />
      ) : (
        <div className="flex-1 h-screen flex flex-col justify-center items-center">
          <div className="w-24 h-24 flex justify-center items-center border-[3px] rounded-full border-black mb-3">
            <BaseIcon
              name="messages"
              viewBox="0 0 24 24"
              width={48}
              height={48}
            />
          </div>
          <h2 className="mb-1 text-xl">Ваши сообщения</h2>
          <p className="mb-4 text-sm text-[#737373]">
            Отправляйте личные фото и сообщения другу или группе
          </p>
          <DirectSearchUser />
        </div>
      )}
    </div>
  );
};

export default Direct;
