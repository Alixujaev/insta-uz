import Post from "./Post";

const Posts = () => {
  return (
    <div className="flex items-center flex-col">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Post key={item} />
      ))}
    </div>
  );
};

export default Posts;
