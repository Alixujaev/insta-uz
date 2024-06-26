import { handleSearchUsers } from "@/store/user.store";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

const Search = ({ isShowSearch }: { isShowSearch: boolean }) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (searchVal) {
      setIsLoading(true);
      timerId = setTimeout(() => {
        handleSearchUsers(searchVal)
          .then((res) => {
            setUsers(res.data.data);
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
    <div
      className={`w-[410px] shadow-2xl z-10 rounded-2xl transition-all duration-300 transform ${
        !isShowSearch ? "-translate-x-[500px]" : "-translate-x-4"
      } bg-white`}
    >
      <div className="pb-5 border-b flex flex-col mb-2">
        <h3 className="pt-3 pb-9 my-2 pl-10 text-2xl font-medium">
          Поисковый запрос
        </h3>

        <input
          type="text"
          placeholder="Поиск"
          className="ml-8 p-2 bg-[#efefef] rounded-lg text-sm outline-none mr-5 !h-10"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="py-5 px-8">
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-sm text-[#8E8E8E]">Loading</p>
          </div>
        </div>
      ) : users.length ? (
        users.map((user) => (
          <Link
            to={`/${user.username}`}
            className="py-2 px-8 flex items-center gap-2 hover:bg-[#efefef] cursor-pointer"
          >
            <Avatar src={user.profile_img} size="sm" />

            <div className="flex flex-col h-fit">
              <h3 className="text-sm font-medium">{user.username}</h3>
              <p className="text-[#8E8E8E] text-sm">{user.full_name}</p>
            </div>
          </Link>
        ))
      ) : (
        <div className="py-5 px-8">
          <div className="flex justify-center items-center h-[50vh]">
            <p className="text-sm text-[#8E8E8E]">Нет данных по запросов.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
