import Avatar from "./Avatar";
import { useLocalStorage } from "usehooks-ts";
import { StoryType, UserType } from "@/consts";

const Story = ({ story }: { story: StoryType }) => {
  const [user] = useLocalStorage("user", {} as UserType);
  return (
    <div className="w-[66px]">
      <Avatar
        src={story.author.profile_img}
        storyId={story._id}
        viewed={story.views.includes(user.id)}
      />
      <p className="text-xs text-center text-[#262626]">
        {story.author.username.length > 10
          ? story.author.username.slice(0, 10) + "..."
          : story.author.username}
      </p>
    </div>
  );
};

export default Story;
