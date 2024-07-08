import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./Avatar";
import DirectHead from "./dropdowns/DirectHead";
import BaseIcon from "./icon/BaseIcon";
import { useEffect, useState } from "react";
import { handleGetOneConversation } from "@/store/cenversations.store";
import { MessageType, UserType } from "@/consts";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const ChatRoom = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatUser, setChatUser] = useState<UserType>({} as UserType);
  const [error, setError] = useState(false);
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token || !chatId) return;

    setIsLoading(true);
    handleGetOneConversation(token, chatId)
      .then((res) => {
        setMessages(res.data.data.messages);
        setChatUser(res.data.data.conversation[0].members[1]);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [chatId]);

  return (
    <div className="flex-1 h-screen flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar size="md" src={chatUser?.profile_img} />
          <h3 className="font-semibold">{chatUser?.full_name}</h3>
        </div>
        <DirectHead />
      </div>
      {isLoading ? (
        <Loader className="h-[80vh]" />
      ) : !messages.length ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <Avatar size="rm" src={chatUser?.profile_img} />
            <h2 className="text-xl mt-4 font-medium">{chatUser?.full_name}</h2>
            <p className="text-sm text-[#737373] mb-4">
              {chatUser?.username} · Instagram
            </p>
            <button
              onClick={() => navigate(`/${chatUser?.username}`)}
              className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg text-sm font-semibold"
            >
              Смотреть профиль
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-3">
          {messages.map((item: MessageType) => (
            <p
              key={item._id}
              className={`text-sm py-[7px] px-3 mb-2 w-fit rounded-3xl ${
                item.sender._id === user._id
                  ? "bg-[#3797f0] text-white ml-auto"
                  : "bg-[#efefef]"
              }`}
            >
              {item.message}
            </p>
          ))}
        </div>
      )}

      {/* <div className="flex-1 overflow-y-auto"></div> */}
      <div className="m-4">
        <div className="border rounded-2xl p-3 py-1 flex items-center">
          <button className="pr-3">
            <BaseIcon name="smilek" cn=" cursor-pointer ml-0" />
          </button>
          <input
            type="text"
            className="flex-1 py-2 outline-none"
            placeholder="Написать сообщение..."
          />
          <button className="font-medium text-sm text-blue-500">
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
