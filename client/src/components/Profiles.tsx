import Avatar from "./Avatar";
import my from "@/assets/images/my.jpg";
import ProfileHead from "./ProfileHead";
import ProfileLinks from "./ProfileLinks";
import { Link } from "react-router-dom";

const Profiles = () => {
  return (
    <div className="mt-6">
      <div className="mt-8 px-2 flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center">
          <Avatar src={my} size="md" />
          <Link to="/profile" className="text-sm font-medium">
            isl0m.ali
          </Link>
        </div>

        <p className="text-xs text-blue-400 font-bold">Переключиться</p>
      </div>

      <div className="flex justify-between items-center px-2 mb-4">
        <p className="text-[#8E8E8E] text-sm font-medium">
          Рекомендации для вас
        </p>

        <p className="text-xs font-medium">Все</p>
      </div>

      <div className="mb-20">
        {[1, 2, 3, 4].map((item) => (
          <ProfileHead key={item} />
        ))}
      </div>

      <ProfileLinks />
    </div>
  );
};

export default Profiles;
