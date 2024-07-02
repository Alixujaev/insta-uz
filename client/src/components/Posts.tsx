import { useEffect, useState } from "react";
import Post from "./Post";
import { handleGetFollowingPosts } from "@/store/post.store";
import Loader from "./Loader";

const Posts = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    handleGetFollowingPosts(token)
      .then((res) => {
        setPosts(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <div className="flex items-center flex-col mb-40">
      {isLoading ? (
        <Loader className="h-[40vh]" />
      ) : posts.length ? (
        posts.map((item) => <Post key={item.id} post={item} />)
      ) : (
        <div className="h-[50vh] text-center flex justify-center items-center">
          <div>
            <h2 className="text-2xl font-bold">Пока нет публикации</h2>
            <p>Для вас пока нет публикаций</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
