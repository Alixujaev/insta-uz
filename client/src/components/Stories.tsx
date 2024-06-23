import Story from "./Story";
import { Swiper, SwiperSlide } from "swiper/react";
import arrow from "@/assets/icons/arrow.svg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

const Stories = () => {
  return (
    <div className="mt-6 flex gap-4 items-center mb-8">
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
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SwiperSlide>
            <Story key={item} />
          </SwiperSlide>
        ))}

        <div className="custom-swiper-button-next absolute top-5 left-3 z-50 transform rotate-180 cursor-pointer">
          <img src={arrow} alt="arrow-left" />
        </div>
        <div className="custom-swiper-button-prev  absolute top-5 right-3 z-50 cursor-pointer">
          <img src={arrow} alt="arrow-right" />
        </div>
      </Swiper>
    </div>
  );
};

export default Stories;
