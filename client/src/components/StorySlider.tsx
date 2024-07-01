import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

const StorySlider = () => {
  return (
    <div className="story w-[450px] h-[800px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="swiper"
      >
        <SwiperSlide className="swiper-slide flex justify-center items-center">
          <img
            src="https://picsum.photos/450/800"
            alt="Slide 1"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide flex justify-center items-center">
          <video autoPlay muted className="w-full h-full object-cover">
            <source
              src="https://exit109.com/~dnn/clips/RW20seconds_1.mp4#t=.1"
              type="video/mp4"
            />
          </video>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide flex justify-center items-center">
          <img
            src="https://picsum.photos/450/810"
            alt="Slide 3"
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default StorySlider;
