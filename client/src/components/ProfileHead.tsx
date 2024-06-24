import my from "@/assets/images/my.jpg";
import Avatar from "./Avatar";

const ProfileHead = () => {
  return (
    <div className="px-2 flex justify-between items-center mb-3">
      <div className="flex gap-4 items-center">
        <Avatar src={my} size="md" />
        <div>
          <p className="text-sm font-medium">isl0m.ali</p>
          <p className="text-xs text-[#8E8E8E]">Рекомендации для вас</p>
        </div>
      </div>

      <p className="text-xs text-blue-400 font-bold">Подписаться</p>
    </div>
  );
};

export default ProfileHead;
