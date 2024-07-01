import logo from "@/assets/icons/white-logo.svg";
import Avatar from "@/components/Avatar";
import Loader from "@/components/Loader";
import AreYouSure from "@/components/dialogs/AreYouSure";
import StoryMore from "@/components/dialogs/StoryMore";
import BaseIcon from "@/components/icon/BaseIcon";
import { StoryType } from "@/consts";
import { formatDate } from "@/lib/utils";
import { handleDeleteStory, handleGetStory } from "@/store/story.store";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Story = () => {
  const params = useParams();
  const [progress, setProgress] = useState(0);
  const token = localStorage.getItem("token");
  const [story, setStory] = useState<StoryType>({} as StoryType);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);
    handleGetStory(params.id as string, token)
      .then((res) => {
        setStory(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);

    return () => clearInterval(interval);
  }, [params]);

  function handleDelete(id: string, token: string | null) {
    if (!token) return;

    handleDeleteStory(id, token)
      .then((res) => {
        navigate(-1);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="bg-[#1a1a1a] w-full h-screen text-white pt-3 flex justify-between relative">
      <img src={logo} alt="logo" className="w-32 h-10" />

      {isLoading || !story ? (
        <div className="w-[380px] h-[90%] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <Loader className="w-full h-full bg-[#514d4d] rounded-md" />
        </div>
      ) : (
        <div className="w-[380px] h-[90%] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={story.image}
            alt="story"
            className="w-full h-full object-cover rounded-md"
          />

          <div className="pt-4 px-3.5 pb-8 absolute top-0 w-full">
            <div className="w-full h-[1px] bg-[#ffffff74] mt-0 !mb-2 relative">
              <div
                className="absolute -top-[.5px] left-0 h-[2px] rounded-full bg-white transition-all duration"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex flex-1 gap-2">
                <Avatar size="sm" src={story.author?.profile_img} />
                <div className="flex gap-2 items-center">
                  <Link
                    to={story.author ? `/${story.author.username}` : "/"}
                    className="text-sm"
                  >
                    {story.author ? story.author.username : ""}
                  </Link>
                  <p className="text-sm text-[#8d8b8b]">
                    {formatDate(new Date(story.createdAt))}
                  </p>
                </div>
              </div>

              {story.author ? (
                <StoryMore author={story.author} id={story._id} />
              ) : null}
            </div>
          </div>

          <div className="absolute bottom-3 flex items-center gap-2 w-full">
            <p className="flex-1 pl-3 text-sm">{story?.description}</p>
            <button className="mr-3">
              <BaseIcon
                name="heart"
                viewBox="0 0 24 24"
                width={32}
                height={32}
                color="white"
              />
            </button>
          </div>
        </div>
      )}

      <button className="absolute top-5 right-5" onClick={() => navigate(-1)}>
        <BaseIcon name="close" width={30} height={30} />
      </button>

      <AreYouSure type="post" fn={() => handleDelete(story._id, token)} />
    </div>
  );
};

export default Story;
