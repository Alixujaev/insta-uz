import { useEffect, useState } from "react";
import Post from "./Post";
import { handleGetFollowingPosts } from "@/store/post.store";

const Posts = () => {
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (!token) return;

    handleGetFollowingPosts(token)
      .then((res) => {
        setPosts(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="flex items-center flex-col mb-40">
      {posts.length ? (
        posts.map((item) => <Post key={item.id} post={item} />)
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};

export default Posts;
