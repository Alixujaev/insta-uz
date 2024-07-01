import logo from "@/assets/icons/white-logo.svg";
import my from "@/assets/images/my.jpg";
import Avatar from "@/components/Avatar";
import BaseIcon from "@/components/icon/BaseIcon";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Story = () => {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1a1a1a] w-full h-screen text-white pt-3 flex justify-between relative">
      <img src={logo} alt="logo" className="w-32 h-10" />

      <div className="w-[380px] h-[90%] absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
        <img
          src={my}
          alt=""
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
            <Avatar size="sm" />
            <div className="flex gap-2 items-center">
              <p className="text-sm">isl0m.ali</p>
              <p className="text-sm text-[#d5d5d5]">27 мин</p>
            </div>
          </div>
        </div>

        <button className="absolute bottom-3 right-3">
          <BaseIcon
            name="heart"
            viewBox="0 0 24 24"
            width={32}
            height={32}
            color="white"
          />
        </button>
      </div>

      <button className="absolute top-5 right-5" onClick={() => navigate(-1)}>
        <BaseIcon name="close" width={30} height={30} />
      </button>
    </div>
  );
};

export default Story;
