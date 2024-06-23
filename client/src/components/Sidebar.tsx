import Logo from "@/assets/icons/instagram-text-logo.png";
import { sidebarLinks } from "@/consts";
import { Link } from "react-router-dom";
import BaseIcon from "./icon/BaseIcon";
import icons from "./icon/icons";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed top-0 left-0 border-r border-[#8e8e8e68] flex flex-col justify-between">
      <div>
        <img
          src={Logo}
          alt="logo icon"
          className="w-28 my-6 ml-6 cursor-pointer"
        />

        <div className="flex flex-col mx-3">
          {sidebarLinks.map(
            (
              item: { icon: keyof typeof icons; label: string; href: string },
              index
            ) => (
              <Link
                className="p-3.5 py-2.5 mb-2.5 flex gap-4 items-center w-full hover:bg-[#f2f2f2] rounded-md"
                key={index}
                to={item.href}
              >
                <BaseIcon name={item.icon} />
                <span className="">{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>

      <div className="ml-3 flex gap-4 items-center px-3.5 mb-10">
        <BaseIcon name="more" />

        <p>Ещё</p>
      </div>
    </div>
  );
};

export default Sidebar;
