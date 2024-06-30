import { handleFollow, handleUnFollow } from "@/store/user.store";
import Avatar from "./Avatar";
import { useState } from "react";

const ProfileHead = ({ user }: { user: any }) => {
  const [followers, setFollowers] = useState<string[]>([]);
  const token = localStorage.getItem("token");

  console.log(user);

  function handleFollowUser(id: string, token: string | null, myId: string) {
    if (!token) return;
    setFollowers([...followers, myId]);
    handleFollow(id, token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setFollowers(followers.filter((follower) => follower !== myId));
      });
  }

  function handleUnFollowUser(id: string, token: string | null, myId: string) {
    if (!token) return;

    setFollowers(followers.filter((follower) => follower !== myId));
    handleUnFollow(id, token)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
        setFollowers([...followers, myId]);
      });
  }

  return (
    <div className="px-2 flex justify-between items-center mb-3">
      <div className="flex gap-4 items-center">
        <Avatar src={user.profile_img} size="md" />
        <div>
          <p className="text-sm font-medium">{user.username}</p>
          <p className="text-xs text-[#8E8E8E]">Рекомендации для вас</p>
        </div>
      </div>

      {followers.includes(user.id) ? (
        <button
          className="text-xs text-[#8E8E8E] font-bold"
          onClick={() => handleUnFollowUser(user._id, token, user.id)}
        >
          Отписаться
        </button>
      ) : (
        <button
          className="text-xs text-blue-400 font-bold"
          onClick={() => handleFollowUser(user._id, token, user.id)}
        >
          Подписаться
        </button>
      )}
    </div>
  );
};

export default ProfileHead;
