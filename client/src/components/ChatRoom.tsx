import React from "react";
import Avatar from "./Avatar";
import DirectHead from "./dropdowns/DirectHead";
import BaseIcon from "./icon/BaseIcon";

const ChatRoom = () => {
  return (
    <div className="flex-1 h-screen flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Avatar size="md" />
          <h3 className="font-semibold">Islom</h3>
        </div>
        <DirectHead />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Avatar size="rm" />
          <h2 className="text-xl mt-4 font-medium">Islom Alixujaev</h2>
          <p className="text-sm text-[#737373] mb-4">isl0m.ali · Instagram</p>
          <button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg text-sm font-semibold">
            Смотреть профиль
          </button>
        </div>
      </div>
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
