import { useLocation, useNavigate } from "react-router-dom";
import BaseIcon from "./icon/BaseIcon";
import { UserType } from "@/consts";
import CreatePost from "./dialogs/CreatePost";
import { useEffect, useState } from "react";
import { handleGetPosts } from "@/store/post.store";
import Post from "./dialogs/Post";

const Tabs = ({ user }: { user: UserType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (location.search === "") {
      const getPosts = async (id: string) => {
        const result = await handleGetPosts(id);

        setPosts(result.data.data);
        setIsLoading(false);
      };

      getPosts(user.id);
    }
  }, [location]);

  return (
    <div>
      <div className="flex justify-center gap-14 border-t">
        <div
          onClick={() => navigate(`${location.pathname}`)}
          className={`flex gap-1 cursor-pointer items-center py-3 border-t-2 border-transparent ${
            location.search === "" ? "!border-black font-medium" : ""
          }`}
        >
          <BaseIcon name="posts" viewBox="0 0 18 18" cn="mt-2" />
          <p className="text-xs">ПУБЛИКАЦИИ</p>
        </div>

        <div
          onClick={() => navigate(`${location.pathname}?saved`)}
          className={`flex gap-1 cursor-pointer items-center py-3 border-t-2 border-transparent ${
            location.search === "?saved" ? " !border-black font-medium" : ""
          }`}
        >
          <BaseIcon name="saved" viewBox="0 0 30 30" cn="mt-2" />
          <p className="text-xs">СОХРАНЕННЫЕ</p>
        </div>
      </div>

      {location.search === "" ? (
        <>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : !isLoading && posts.length === 0 ? (
            <div className="h-[40vh] flex flex-col justify-center items-center w-full">
              <h2 className="text-3xl font-bold mb-3">Поделиться фото</h2>
              <p className="text-sm w-[35%] mx-auto text-center mb-2">
                Фото, которыми вы делитесь, будут показываться в вашем профиле.
              </p>
              <CreatePost profile />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-20">
              {posts.map((item: any) => (
                <Post key={item.id} post={item} author={user} />
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-20">
            {/* {user.posts.map((item: any) => (
          <Post key={item.id} post={item} author={user} />
        ))} */}
          </div>
          <div className="h-[40vh] flex flex-col justify-center items-center w-full">
            <h2 className="text-3xl font-bold mb-3">Поделиться фото</h2>
            <p className="text-sm w-[35%] mx-auto text-center mb-2">
              Фото, которыми вы делитесь, будут показываться в вашем профиле.
            </p>
            <CreatePost profile />
          </div>
        </>
      )}
    </div>
  );
};

export default Tabs;