import Avatar from "./Avatar";

const ChatList = () => {
  return (
    <div className="w-[380px] h-screen border-r">
      <div className="pt-9 px-6 pb-3 bg-white">
        <h2 className="text-2xl font-bold ">Сообщения</h2>
      </div>

      <div
        className="overflow-y-auto "
        style={{ height: "calc(100vh - 80px)" }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 2].map((item) => (
          <div
            key={item}
            className="px-4 py-2 flex gap-3 items-center cursor-pointer "
          >
            <Avatar size="dr" />
            <div>
              <h3 className="text-sm">Asadbek</h3>
              <span className="text-xs text-[#8E8E8E]">
                Ozi dars bermaydi.
              </span>{" "}
              <span className="text-xs text-[#8E8E8E]">17 ч.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
