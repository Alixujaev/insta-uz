import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import { handleGetFollowers, handleGetFollowing } from "@/store/user.store";
import Avatar from "../Avatar";
import { Button } from "../ui/button";

const UserList = ({
  count,
  type,
  id,
  token,
  myId,
}: {
  count: number;
  type: "followers" | "following";
  id: string;
  token?: string | null;
  myId?: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchVal, setSearchVal] = useState<string>("");
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
          {/* <input
            type="text"
            placeholder="Поиск"
            className="mb-4 p-2 py-1.5 bg-[#efefef] rounded-lg text-sm outline-none w-full"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          /> */}

          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-24">
                <p className="text-sm text-[#8E8E8E]">Загрузка...</p>
              </div>
            ) : (
              users.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-3 mr-3"
                >
                  <div className="flex gap-2 items-center flex-1">
                    <Avatar size="md" src={item.profile_img} />
                    <div>
                      <p className="text-sm font-medium">{item.username}</p>
                      <p className="text-xs text-[#8E8E8E] whitespace-nowrap">
                        {item.full_name}
                      </p>
                    </div>
                  </div>
                  {type === "followers" ? (
                    <Button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-7 text-sm font-semibold">
                      Удалить
                    </Button>
                  ) : (
                    <Button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-7 text-sm font-semibold">
                      Отписаться
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
