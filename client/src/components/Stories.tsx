import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import arrow from "@/assets/icons/arrow.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import { handleGetStories } from "@/store/story.store";
import Loader from "./Loader";
import { StoryType } from "@/consts";

const Stories = () => {
  const token = localStorage.getItem("token");
  const [stories, setStories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    setIsLoading(true);

    handleGetStories(token)
      .then((res) => {
        setStories(res.data.data.reverse());
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  }, [token]);

  return (
    <div className="mt-6 flex gap-4 items-center mb-8">
      {isLoading ? (
        <Loader className="h-[10vh]" />
      ) : stories.length === 0 ? (
        <h4 className="text-lg font-medium">no Stories</h4>
      ) : stories.length < 8 ? (
        <div className="flex gap-2">
          {stories.map((item: StoryType) => (
            <Story key={item._id} story={item} />
          ))}
        </div>
      ) : (
        <Swiper
          slidesPerView={8}
          navigation={{
            nextEl: ".custom-swiper-button-prev",
            prevEl: ".custom-swiper-button-next",
          }}
          modules={[Navigation]}
          className="mySwiper"
          pagination={{
            type: "fraction",
          }}
        >
          {stories.map((item: StoryType) => (
            <SwiperSlide>
              <Story key={item._id} story={item} />
            </SwiperSlide>
          ))}

          <div className="custom-swiper-button-next absolute top-5 left-3 z-50 transform rotate-180 cursor-pointer">
            <img src={arrow} alt="arrow-left" />
          </div>
          <div className="custom-swiper-button-prev  absolute top-5 right-3 z-50 cursor-pointer">
            <img src={arrow} alt="arrow-right" />
          </div>
        </Swiper>
      )}
    </div>
  );
};

export default Stories;
