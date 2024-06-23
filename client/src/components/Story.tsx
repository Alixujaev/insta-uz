import { Link } from "react-router-dom";
import my from "@/assets/images/my.jpg";
import Avatar from "./Avatar";

const Story = () => {
  return (
    <Link to="/" className="w-[66px]">
      <Avatar src={my} />
      <p className="text-xs text-center text-[#262626]">
        {`alixujaev_islom`.length > 10
          ? `alixujaev_islom`.slice(0, 10) + "..."
          : `alixujaev_islom`}
      </p>
    </Link>
  );
};

export default Story;
