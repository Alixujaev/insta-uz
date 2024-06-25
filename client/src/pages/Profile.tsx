import Avatar from "@/components/Avatar";
import { Link, useParams } from "react-router-dom";
import BaseIcon from "@/components/icon/BaseIcon";
import { UserType } from "@/consts";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Tabs from "@/components/Tabs";
import { handleGetUser } from "@/store/user.store";
import EditProfile from "@/components/dialogs/EditProfile";

const Profile = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    async function getUserInfo(username: string) {
      const result = await handleGetUser(username);

      setUser(result.data.data.user);
      setIsLoading(false);
    }

    if (!params.username) return;

    getUserInfo(params.username);
  }, [params]);

  return (
    <div className="flex justify-center">
      {isLoading || !user ? (
        <Loader />
      ) : (
        <div className="w-[930px] mt-8 ml-14">
          <div className="flex gap-20 mb-16">
            <div className="mt-5 ml-2">
              <Avatar size="xl" src={user.profile_img} />
            </div>

            <div>
              <div className="flex gap-5 items-center mb-6">
                <Link to="/profile" className="text-2xl">
                  {user.username}
                </Link>

                <div className="flex gap-3 items-center">
                  <div className="flex gap-2">
                    <EditProfile user={user} />
                  </div>
                  <button>
                    <BaseIcon name="settings" />
                  </button>
                </div>
              </div>
              <div className="flex gap-10 mb-6">
                <p>
                  <span className="font-medium">{user.posts.length} </span>
                  публикаций
                </p>
                <p>
                  <span className="font-medium">{user.followers.length} </span>
                  подписчиков
                </p>
                <p>
                  <span className="font-medium">{user.following.length} </span>
                  подписок
                </p>
              </div>

              <p className="font-semibold">{user.full_name}</p>
              <p className="text-[#8E8E8E] text-sm">{user.email}</p>
              <p className="font-semibold text-sm">{user.about}</p>
            </div>
          </div>

          <Tabs user={user} />
        </div>
      )}
    </div>
  );
};

export default Profile;
