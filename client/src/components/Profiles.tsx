import Avatar from "./Avatar";
import ProfileHead from "./ProfileHead";
import ProfileLinks from "./ProfileLinks";
import { Link } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { UserType } from "@/consts";
import { useEffect, useState } from "react";
import { handleGetRecomendeds } from "@/store/user.store";
import Loader from "./Loader";

const Profiles = () => {
  const [user] = useLocalStorage("user", {} as UserType);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    handleGetRecomendeds(token)
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="mt-6">
      <div className="mt-8 px-2 flex justify-between items-center mb-4">
        <div className="flex gap-4 items-center flex-1">
          <Avatar src={user.profile_img} size="md" />
          <Link to={`/${user.username}`} className="text-sm font-medium">
            {user.username}
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
        {isLoading ? (
          <Loader className="h-[30vh]" />
        ) : users.length ? (
          users.map((item) => <ProfileHead key={item.id} user={item} />)
        ) : (
          <div className="flex justify-center items-center h-20">
            <p className="text-sm font-medium text-[#8E8E8E]">
              Нет рекомендации
            </p>
          </div>
        )}
      </div>

      <ProfileLinks />
    </div>
  );
};

export default Profiles;
