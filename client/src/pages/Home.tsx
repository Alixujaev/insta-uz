import Stories from "@/components/Stories";
import Posts from "../components/Posts";
import Profiles from "@/components/Profiles";

const Home = () => {
  return (
    <div className="flex justify-center gap-16">
      <div className="w-[630px]">
        <Stories />
        <Posts />
      </div>
      <div className="w-[320px]">
        <Profiles />
      </div>
    </div>
  );
};

export default Home;
