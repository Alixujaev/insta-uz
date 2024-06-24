import Avatar from "@/components/Avatar";
import me from "@/assets/images/my.jpg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BaseIcon from "@/components/icon/BaseIcon";
import my from "@/assets/images/me.jpg";

const Profile = () => {
  return (
    <div className="flex justify-center">
      <div className="w-[930px] mt-8 ml-14">
        <div className="flex gap-20 mb-16">
          <div className="mt-5 ml-2">
            <Avatar size="xl" />
          </div>

          <div>
            <div className="flex gap-5 items-center mb-6">
              <Link to="/profile" className="text-2xl">
                isl0m.ali
              </Link>

              <div className="flex gap-3 items-center">
                <div className="flex gap-2">
                  <Button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-8">
                    Редактировать профиль
                  </Button>
                  <Button className="bg-[#EFEFEF] hover:bg-[#dbdbdb] text-black px-4 !py-1 !rounded-lg h-8">
                    Посмотреть архив
                  </Button>
                </div>
                <button>
                  <BaseIcon name="settings" />
                </button>
              </div>
            </div>
            <div className="flex gap-10 mb-6">
              <p>
                <span className="font-medium">0</span> публикаций
              </p>
              <p>
                <span className="font-medium">189</span> подписчиков
              </p>
              <p>
                <span className="font-medium">194</span> подписок
              </p>
            </div>

            <p className="font-semibold">Islom Alixujaev</p>
          </div>
        </div>

        <div className="flex gap-12 pb-12 border-b">
          <div className="flex flex-col items-center">
            <Avatar src={me} hasStory />
            <p className="mt-1">🤝</p>
          </div>
          <div className="flex flex-col items-center">
            <Avatar src={me} hasStory />
            <p className="mt-1">🤝</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-[66px] h-[66px] border flex justify-center items-center rounded-full">
              <BaseIcon name="plus" width={28} height={28} />
            </div>
            <p className="mt-1 text-xs">Добавить</p>
          </div>
        </div>

        <div className="flex justify-center gap-14 ">
          <div className="flex gap-1 cursor-pointer items-center py-3 border-t-2 border-black">
            <BaseIcon name="posts" viewBox="0 0 18 18" cn="mt-2" />
            <p className="text-xs">ПУБЛИКАЦИИ</p>
          </div>

          <div className="flex gap-1 cursor-pointer items-center py-3 border-t-2 border-transparent">
            <BaseIcon name="small_reels" viewBox="0 0 18 18" cn="mt-2" />
            <p className="text-xs">REELS</p>
          </div>

          <div className="flex gap-1 cursor-pointer items-center py-3 border-t-2 border-transparent">
            <BaseIcon name="tagged" viewBox="0 0 18 18" cn="mt-2" />
            <p className="text-xs">ОТМЕТКИ</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mb-20">
          <img
            src={my}
            alt="post"
            className="w-[309px] h-[309px] object-cover object-center cursor-pointer"
          />
          <img
            src={my}
            alt="post"
            className="w-[309px] h-[309px] object-cover object-center cursor-pointer"
          />
          <img
            src={my}
            alt="post"
            className="w-[309px] h-[309px] object-cover object-center cursor-pointer"
          />
          <img
            src={my}
            alt="post"
            className="w-[309px] h-[309px] object-cover object-center cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
