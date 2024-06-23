import Sidebar from "@/components/Sidebar";
import Stories from "@/components/Stories";
import Posts from "../components/Posts";

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="flex-1 flex justify-center gap-16">
        <div className="w-[630px]">
          <Stories />
          <Posts />
        </div>
        <div className="w-[320px]"></div>
      </div>
    </div>
  );
};

export default Home;
