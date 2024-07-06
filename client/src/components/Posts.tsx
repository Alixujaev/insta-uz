import Post from "./Post";
import { handleGetFollowingPosts } from "@/store/post.store";
import Loader from "./Loader";
import useFetchData from "@/hooks/useFetchData";
import { PostType } from "@/consts";

const Posts = () => {
  const { data: posts, isLoading } = useFetchData<PostType[]>(
    "posts",
    handleGetFollowingPosts
  );

  return (
    <div className="flex items-center flex-col mb-40">
      {isLoading ? (
        <Loader className="h-[40vh]" />
      ) : posts?.length ? (
        posts.map((item) => <Post key={item._id} post={item} />)
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
