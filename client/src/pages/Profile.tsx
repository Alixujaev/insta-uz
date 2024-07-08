import Avatar from "@/components/Avatar";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BaseIcon from "@/components/icon/BaseIcon";
import { StoryType, UserType } from "@/consts";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Tabs from "@/components/Tabs";
import {
  handleFollow,
  handleGetUser,
  handleUnFollow,
} from "@/store/user.store";
import EditProfile from "@/components/dialogs/EditProfile";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import UserList from "@/components/dialogs/UserList";
import { useSelector } from "react-redux";
import NotFound from "@/components/NotFound";
import CreateStory from "@/components/dialogs/CreateStory";

import { handleGetStory } from "@/store/story.store";

const Profile = () => {
  const { isUpdatePosts } = useSelector((state: any) => state.settings);
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [my] = useLocalStorage<{ id: string }>("user", { id: "" });
  const [user, setUser] = useState<UserType | null>(null);
  const token = localStorage.getItem("token");
  const [followers, setFollowers] = useState<string[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [story, setStory] = useState<StoryType>({} as StoryType);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      if (!pathname || !token) return;

      try {
        const res = await handleGetUser(pathname.substring(1));
        if (!isMounted) return; // Prevent setting state on unmounted component
        setUser(res.data.data.user);
        setFollowers(res.data.data.user.followers || []);
        setFollowing(res.data.data.user.following || []);

        // Fetch story
        const storyRes = await handleGetStory(
          res.data.data.user?.stories[0],
          token
        );
        setStory(storyRes.data.data);

        setIsLoading(false);
      } catch (err) {
        setError(true);
        setIsLoading(false);
        // Handle error
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Clean up to prevent state updates on unmounted component
    };
  }, [pathname, isUpdatePosts]);

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
    <div className="flex justify-center">
      {isLoading ? (
        <Loader className="!h-screen" />
      ) : !isLoading && error && !user ? (
        <NotFound />
      ) : !isLoading && user ? (
        <div className="w-[930px] mt-8 ml-14">
          <div className="flex gap-20 mb-16">
            <div className="mt-5 ml-2">
              {user.stories.length ? (
                <Avatar
                  size="xl"
                  src={user.profile_img}
                  storyId={user.stories[0]}
                  viewed={story?.views?.includes(my.id)}
                />
              ) : my.id === user.id ? (
                <CreateStory profile_img={user.profile_img} />
              ) : (
                <Avatar size="xl" src={user.profile_img} storyId="" />
              )}
            </div>

            <div>
              <div className="flex gap-5 items-center mb-6">
                <Link to="/profile" className="text-2xl">
                  {user.username}
                </Link>

                {my.id === user.id ? (
                  <div className="flex gap-3 items-center">
                    <div className="flex gap-2">
                      <EditProfile user={user} />
                    </div>
                    {/* <button>
                      <BaseIcon name="settings" />
                    </button> */}
                  </div>
                ) : (
                  <div className="flex gap-3 items-center">
                    {followers.includes(my.id) ? (
                      <Button
                        onClick={() =>
                          handleUnFollowUser(user.id, token, my.id)
                        }
                        className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-8"
                      >
                        Отменить подписку
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleFollowUser(user.id, token, my.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 !py-1 !rounded-lg h-8"
                      >
                        Подписаться
                      </Button>
                    )}
                    <Button
                      onClick={() => navigate(`/direct/t/${user.id}`)}
                      className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-8"
                    >
                      Отправить сообщение
                    </Button>
                    {/* <button>
                      <BaseIcon name="settings" />
                    </button> */}
                  </div>
                )}
              </div>
              <div className="flex gap-10 mb-6">
                <p>
                  <span className="font-medium">{user.posts?.length}</span>
                  публикаций
                </p>
                {user.followers?.length > 0 ? (
                  <UserList
                    count={followers.length}
                    token={token}
                    type="followers"
                    id={user.id}
                    followers={followers}
                    setFollowers={setFollowers}
                  />
                ) : (
                  <p>
                    <span className="font-medium">{followers.length}</span>{" "}
                    подписчиков
                  </p>
                )}

                {user.following?.length > 0 ? (
                  <UserList
                    count={following.length}
                    token={token}
                    type="following"
                    id={user.id}
                    following={following}
                    setFollowing={setFollowing}
                  />
                ) : (
                  <p>
                    <span className="font-medium">{following.length}</span>{" "}
                    подписок
                  </p>
                )}
              </div>

              <p className="font-semibold">{user.full_name}</p>
              <p className="text-[#8E8E8E] text-sm">{user.email}</p>
              <p className="font-semibold text-sm">{user.about}</p>
            </div>
          </div>

          <Tabs user={user} myAcc={my.id === user.id} />
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
