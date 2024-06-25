import user from "@/assets/images/user.jpg";

const Avatar = ({
  src,
  size = "lg",
  hasStory = false,
}: {
  src?: string;
  size?: string;
  hasStory?: boolean;
}) => {
  function generateSizes(size: string) {
    switch (size) {
      case "xs":
        return "max-w-[32px] w-full h-[32px]";
      case "sm":
        return "max-w-[38px] w-full h-[38px]";
      case "md":
        return "max-w-[44px] w-full h-[44px]";
      case "lg":
        return "max-w-[66px] w-full h-[66px]";
      case "xl":
        return "max-w-[156px] w-full h-[156px]";
      default:
        return "max-w-[66px] w-full h-[66px]";
    }
  }

  return hasStory ? (
    <div
      className={`gradient-border flex items-center justify-center rounded-full ${generateSizes(
        size
      )}`}
    >
      <div className="!w-[93%] h-[93%] bg-white rounded-full flex justify-center items-center">
        {src ? (
          <img
            src={src}
            alt="Profile"
            className="rounded-full w-[95%] h-[97%] object-cover object-center"
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
  ) : src ? (
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
