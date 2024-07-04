import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import {
  handleDeleteFollower,
  handleFollow,
  handleGetFollowers,
  handleGetFollowing,
  handleUnFollow,
} from "@/store/user.store";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { log } from "console";

const UserList = ({
  count,
  type,
  id,
  token,
  followers,
  setFollowers,
  following,
  setFollowing,
}: {
  count: number;
  type: "followers" | "following";
  id: string;
  token?: string | null;
  followers?: string[];
  setFollowers?: any;
  following?: string[];
  setFollowing?: any;
}) => {
  const { user } = useSelector((state: any) => state.user);
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      setIsLoading(true);

      if (type === "followers") {
        handleGetFollowers(id)
          .then((res) => {
            setUsers(res.data.data.followers);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } else {
        handleGetFollowing(id)
          .then((res) => {
            setUsers(res.data.data.following);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }
    }
  }, [open, type, id]);

  function handleUnFollowUser(id: string, token: string | null | undefined) {
    if (!token) return;

    handleUnFollow(id, token)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id));
        setFollowing(following?.filter((following) => following !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFollowerDelete(id: string, token: string | null | undefined) {
    if (!token) return;

    handleDeleteFollower(id, token)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id));
        setFollowers(followers?.filter((follower) => follower !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function followMy(id: string, token: string | null | undefined) {
    if (!token) return;

    handleFollow(id, token)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function unFollowMy(id: string, token: string | null | undefined) {
    if (!token) return;

    handleUnFollow(id, token)
      .then((res) => {
        console.log(res);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!users.length) setOpen(false);
  }, [users]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p>
          <span className="font-medium">{count}</span>{" "}
          {type === "followers" ? "подписчиков" : "подписок"}
        </p>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-96 max-h-[400px]">
        <h4 className="text-center font-medium pb-2 border-b-2">
          {type === "followers" ? "Подписчики" : "Ваши подписки"}
        </h4>
        <div className="mx-3 my-2">
          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <Loader />
            ) : (
              users.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3 mr-3"
                >
                  <div className="flex gap-2 items-center flex-1">
                    <Avatar size="md" src={item.profile_img} />
                    <div>
                      <Link
                        to={`/${item.username}`}
                        className="text-sm font-medium"
                      >
                        {item.username}
                      </Link>
                      <p className="text-xs text-[#8E8E8E] whitespace-nowrap">
                        {item.full_name}
                      </p>
                    </div>
                  </div>
                  {id === user.id ? (
                    type === "followers" ? (
                      <Button
                        onClick={() => handleFollowerDelete(item._id, token)}
                        className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-7 text-sm font-semibold"
                      >
                        Удалить
                      </Button>
                    ) : (
                      <Button
                        onClick={() => handleUnFollowUser(item._id, token)}
                        className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-7 text-sm font-semibold"
                      >
                        Отписаться
                      </Button>
                    )
                  ) : item._id === user.id ? null : user.following?.includes(
                      item._id
                    ) ? (
                    <Button
                      onClick={() => unFollowMy(item._id, token)}
                      className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-7 text-sm font-semibold"
                    >
                      Отписаться
                    </Button>
                  ) : (
                    <Button
                      onClick={() => followMy(item._id, token)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 !py-1 !rounded-lg h-7 text-sm font-semibold"
                    >
                      Подписаться
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserList;
