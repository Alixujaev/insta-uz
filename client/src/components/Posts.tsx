import { useEffect } from "react";
import Post from "./Post";
import { handleGetFollowingPosts } from "@/store/post.store";

const Posts = () => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    handleGetFollowingPosts(token)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="flex items-center flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Post key={item} />
      ))}
    </div>
  );
};

export default Posts;
