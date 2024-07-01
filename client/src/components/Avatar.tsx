import user from "@/assets/images/user.jpg";
import { useNavigate } from "react-router-dom";

const Avatar = ({
  src,
  size = "lg",
  storyId,
}: {
  src?: string;
  size?: string;
  storyId?: string;
}) => {
  const navigate = useNavigate();

  function generateSizes(size: string) {
    switch (size) {
      case "xs":
        return "max-w-[32px] w-full h-[32px]";
      case "sm":
        return " w-[38px] h-[38px]";
      case "md":
        return "max-w-[44px] w-full h-[44px]";
      case "lg":
        return "max-w-[66px] w-full h-[66px]";
      case "xl":
        return "w-[156px] h-[156px]";
      default:
        return "max-w-[66px] w-full h-[66px]";
    }
  }

  return storyId ? (
    <div
      onClick={() => navigate(`/stories/${storyId}`)}
      className={`cursor-pointer gradient-border flex items-center justify-center rounded-full ${generateSizes(
        size
      )}`}
    >
      <div
        className={`${
          size !== "xl" ? "!w-[93%] h-[93%]" : "!w-[95%] h-[95%]"
        } bg-white rounded-full flex justify-center items-center`}
      >
        {src ? (
          <img
            src={src}
            alt="Profile"
            className={`rounded-full object-cover object-center w-[95%] h-[97%]`}
          />
        ) : (
          <img
            src={user}
            alt="Profile"
            className="rounded-full w-[95%] h-[97%] object-cover object-center"
          />
        )}
      </div>
    </div>
  ) : src?.trim() ? (
    <img
      src={src}
      alt="Profile"
      className={`rounded-full ${generateSizes(
        size
      )} object-cover object-center`}
    />
  ) : (
    <img
      src={user}
      alt="Profile"
      className={`rounded-full ${generateSizes(
        size
      )} object-cover object-center`}
    />
  );
};

export default Avatar;
