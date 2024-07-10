import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UserType } from "@/consts";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { handleGetViewers } from "@/store/story.store";
import Loader from "../Loader";
import { useLocalStorage } from "usehooks-ts";

type User = {
  _id: string;
  profile_img: string;
  username: string;
  full_name: string;
};

const Viewers = ({
  count,
  id,
  setStop,
}: {
  count: number;
  id: string;
  setStop: (v: boolean) => void;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user] = useLocalStorage<UserType>("user", {} as UserType);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    setIsLoading(true);
    if (open) {
      setStop(true);
      handleGetViewers(id, token)
        .then((res) => {
          setUsers(
            res.data.data.views.filter((item: User) => item._id !== user.id)
          );
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    } else {
      setStop(false);
    }
  }, [id, open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p className="text-sm">{count} просмотры</p>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-96 max-h-[400px]">
        <DialogTitle className="text-center font-medium pb-2 border-b-2">
          Просмотры ({count})
        </DialogTitle>
        <div className="mx-3 my-2">
          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <Loader className="h-[30vh]" />
            ) : (
              users.map((item) => (
                <div
                  key={item._id}
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
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Viewers;
