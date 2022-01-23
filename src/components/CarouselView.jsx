import { useRef } from "react";
import Slider from "react-slick";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import moment from "moment";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
// import ProgressiveImage from "react-progressive-image";

import { Backdrop } from "../components";

import { LEGEND_MAP } from "../constants";
import { truncate } from "../utils";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselView = ({ isOpen, posts, closeView }) => {
  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "420px",
    dots: false,
    arrows: true,
    infinite: false,
    slidesToShow: 1,
    speed: 1000,
    focusOnSelect: true,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // pauseOnHover: true,
    // variableWidth: true,
    responsive: [
      { breakpoint: 1220, settings: { centerPadding: "400px" } },
      { breakpoint: 1024, settings: { centerPadding: "340px" } },
      { breakpoint: 900, settings: { centerPadding: "260px" } },
      { breakpoint: 768, settings: { arrows: false, centerPadding: "150px" } },
      { breakpoint: 600, settings: { arrows: false, centerPadding: "100px" } },
      { breakpoint: 500, settings: { arrows: false, centerPadding: "60px" } },
      { breakpoint: 425, settings: { arrows: false, centerPadding: "40px" } }
    ]
  };

  const sliderRef = useRef(null);

  // TODO:
  // const scrollToSelectedPost = () => {
  //   sliderRef.current.slickGoTo();
  // };

  return (
    <div className="">
      <ModalUnstyled
        className="flex justify-center items-center bg-transparent fixed inset-0 z-50"
        open={isOpen}
        onClose={closeView}
        BackdropComponent={Backdrop}
      >
        <div className="w-full h-full">
          <button
            className="bg-[#4B4B4B] rounded-[50%] text-3xl p-1 absolute top-5 right-5 z-10"
            onClick={closeView}
          >
            <AiOutlineClose color={"#FFFFFF"} />
          </button>

          <Slider {...settings} ref={sliderRef}>
            {posts?.map((post) => (
              <div className="h-[75%] w-[70vw] flex-col" key={post.id}>
                <PostImage images={post.media} />

                <div className="w-full h-[40%] bg-white text-[#6D6B6E] rounded-b-md py-2">
                  <div className="w-full h-8 flex justify-between my-1 px-2">
                    <LegendCodes typeOfDay={post.typeofday || []} />
                    <Rating value={post.rating} />
                  </div>

                  <div className="h-28 px-3 py-1 mb-1">
                    <h2 className="font-bold mb-[2px]">
                      {moment(post.calendardatetime).format("DD MMMM")}
                    </h2>
                    <p className="text-sm">{truncate(post.text)}</p>
                  </div>

                  <div className="w-full flex justify-center items-center text-lg text-[#1C2337] font-bold border-t-[1px] border-black pt-2 cursor-pointer">
                    View full Post
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </ModalUnstyled>
    </div>
  );
};

// TODO: refactor

const PostImage = ({ images }) => {
  return (
    <div className="w-full h-[400px] overflow-hidden">
      <img
        className="w-full rounded-t-md"
        src={images[0].mediaurl}
        alt="post"
      />
    </div>
  );
};

const LegendCodes = ({ typeOfDay }) => {
  return (
    <div className="flex justify-center items-center">
      {typeOfDay.map((dayType) => {
        const legend = LEGEND_MAP[dayType];
        if (!legend) return null;
        return (
          <span
            key={dayType}
            className="w-7 h-7 rounded-[50%] text-[0.8rem] font-normal mx-[3px] flex justify-center items-center"
            style={{ backgroundColor: legend.color }}
          >
            {legend.code}
          </span>
        );
      })}
    </div>
  );
};

const Rating = ({ value }) => {
  return (
    <div className="flex justify-center items-center text-[20px]">
      {Array.from(new Array(5)).map((_, index) =>
        index < value ? (
          <AiFillStar key={index} color={"#9DD0EB"} />
        ) : (
          <AiFillStar key={index} color={"#D2D4D8"} />
        )
      )}
    </div>
  );
};

export default CarouselView;
