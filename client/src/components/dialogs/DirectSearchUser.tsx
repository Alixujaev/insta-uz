import { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { handleSearchUsers } from "@/store/user.store";
import Loader from "../Loader";
import { useSelector } from "react-redux";
import { UserType } from "@/consts";
import { useNavigate } from "react-router-dom";

const DirectSearchUser = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (searchVal) {
      setIsLoading(true);
      timerId = setTimeout(() => {
        handleSearchUsers(searchVal)
          .then((res) => {
            setUsers(
              res.data.data.filter((item: UserType) => item._id !== user.id)
            );
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      }, 2000);
    }

    return () => clearTimeout(timerId);
  }, [searchVal]);

  return (
    <Dialog>
      <DialogTrigger>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 text-sm font-semibold py-1.5 !rounded-lg">
          Отправить сообщение
        </button>
      </DialogTrigger>
      <DialogContent className="!rounded-2xl !py-2 !px-0 !gap-0 !w-[516px]">
        <h4 className="text-center font-bold pb-2 border-b border-[#dbdbdb]">
          Новое сообщение
        </h4>
        <div className="border-b border-[#dbdbdb] flex ">
          <p className="px-4 py-2 font-semibold">Кому:</p>
          <input
            type="text"
            className="outline-none text-sm"
            placeholder="Поиск..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
        <div className="h-[286px] overflow-y-auto">
          {isLoading ? (
            <Loader className="h-[286px]" />
          ) : users?.length ? (
            users.map((user) => (
              <div
                onClick={() => navigate(`/direct/t/${user._id}`)}
                key={user._id}
                className="flex py-2 px-4 gap-2 items-center hover:bg-slate-100 cursor-pointer"
              >
                <Avatar src={user.profile_img} size="md" />
                <div>
                  <h3 className="">{user.full_name}</h3>
                  <p className="text-sm text-[#737373]">{user.username}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#737373] p-5">Аккаунты не найдены.</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DirectSearchUser;
