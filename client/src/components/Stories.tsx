import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import arrow from "@/assets/icons/arrow.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { handleGetStories } from "@/store/story.store";
import Loader from "./Loader";
import { StoryType } from "@/consts";
import useFetchData from "@/hooks/useFetchData";

const Stories = () => {
  const token = localStorage.getItem("token");
  const { data: stories, isLoading } = useFetchData<StoryType[]>(
    "stories",
    handleGetStories
  );

  return (
    <div className="mt-6 flex gap-4 items-center mb-8">
      {isLoading ? (
        <Loader className="h-[10vh]" />
      ) : stories?.length === 0 ? (
        <h4 className="font-medium text-center">Пока нет историй</h4>
      ) : stories?.length < 8 ? (
        <div className="flex gap-2">
          {stories?.map((item: StoryType) => (
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
          {stories?.map((item: StoryType) => (
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
