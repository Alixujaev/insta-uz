const Avatar = ({ src, size = "lg" }: { src: string; size?: string }) => {
  function generateSizes(size: string) {
    switch (size) {
      case "sm":
        return "w-[38px] h-[38px]";
      case "md":
        return "w-[44px] h-[44px]";
      case "lg":
        return "w-[66px] h-[66px]";
      case "xl":
        return "w-[166px] h-[166px]";
      default:
        return "w-[66px] h-[66px]";
    }
  }
  return (
    <div
      className={`gradient-border flex items-center justify-center rounded-full ${generateSizes(
        size
      )}`}
    >
      <div className="!w-[93%] h-[93%] bg-white rounded-full flex justify-center items-center">
        <img
          src={src}
          alt="Profile"
          className="rounded-full w-[95%] h-[97%] object-cover object-center"
        />
      </div>
    </div>
  );
};

export default Avatar;
