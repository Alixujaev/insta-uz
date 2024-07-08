import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { handleGetConversations } from "@/store/cenversations.store";
import { formatDate } from "@/lib/utils";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ChatList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState([]);
  const { user } = useSelector((state: any) => state.user);
  const { updateChatUsers } = useSelector((state: any) => state.settings);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    handleGetConversations(token, user.id)
      .then((res) => {
        setConversations(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [user, updateChatUsers]);

  return (
    <div className="w-[380px] h-screen border-r">
      <div className="pt-9 px-6 pb-3 bg-white">
        <h2 className="text-2xl font-bold ">Сообщения</h2>
      </div>

      <div
        className="overflow-y-auto "
        style={{ height: "calc(100vh - 80px)" }}
      >
        {isLoading ? (
          <Loader className="h-[60vh]" />
        ) : (
          conversations.map(
            (item: { _id: string; members: any[]; updatedAt: string }) => (
              <div
                key={item._id}
                className="px-4 py-2 flex gap-3 items-center cursor-pointer"
                onClick={() => navigate(`/direct/t/${item._id}`)}
              >
                <Avatar
                  size="dr"
                  src={
                    item.members.filter((u) => u._id !== user.id)[0].profile_img
                  }
                />
                <div>
                  <h3 className="text-sm">
                    {item.members.filter((u) => u._id !== user.id)[0].full_name}
                  </h3>
                  <span className="text-xs text-[#8E8E8E]">
                    {item.members.filter((u) => u._id !== user.id)[0].username}
                  </span>{" "}
                  <span className="text-xs text-[#8E8E8E]">
                    {formatDate(new Date(item.updatedAt))}
                  </span>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default ChatList;
