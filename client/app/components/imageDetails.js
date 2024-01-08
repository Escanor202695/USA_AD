// ImageDetails.js
"use client";
import React, { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImageDisplayBig from "./ImageDisplayBig";
import ImageDisplaySmall from "./ImageDisplaySmall";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        right: "32px", // Adjust right position as needed
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        top: "50%",
        left: "10px", // Adjust left position as needed
        transform: "translateY(-50%)",
        zIndex: 1,
      }}
      onClick={onClick}
    ></div>
  );
}

const ImageDetails = ({ images, contactInfo, adInfo, formData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);
  const settings = {
    ref: sliderRef,
    autoPlay: true,
    autoplaySpeed: 500,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    beforeChange: (current, next) => {
      setActiveIndex(next);
    },
    afterChange: (current) => {
      setActiveIndex(current);
    },
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className="flex  p-4 min-h-[100vh]">
      <div className="w-2/3 pr-4">
        <Slider {...settings}>
          {images?.map((image, index) => (
            <div key={index}>
              <ImageDisplayBig imageUrl={image?.url} />
            </div>
          ))}
        </Slider>
        <div className="flex m-2 justify-center gap-2 max-w-5xl overflow-x-auto">
          {images?.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                setActiveIndex(index);
                goToSlide(index);
              }}
            >
              <div
                className={`cursor-pointer border-2 border-transparent   ${
                  index === activeIndex ? " !border-pink-500" : ""
                }`}
              >
                <ImageDisplaySmall imageUrl={image?.url} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-pink-500 mt-4">
          <span className="text-lg text-white underline">Details:</span> <br />
          {adInfo?.Details}
        </p>
      </div>
      <div className="w-1/3">
        <div className="text-pink-500">
          <h2 className="text-2xl underline font-bold mb-2">Basic Info</h2>
          {adInfo && (
            <ul>
              {Object.entries(adInfo).map(([field, value]) => {
                if (typeof value === "object") {
                  return null;
                }
                return (
                  <li key={field}>
                    <span className="text-white">{field}:</span>{" "}
                    <span className="text-pink-500">{value}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {Object.entries(formData?.data || {})
          .filter(([key, value]) => key !== "Ad info") // Exclude Ad info
          .map(([sectionName, sectionData], index) => (
            <div key={index} className="mt-4 max-h-[200px] overflow-y-auto">
              <span className="text-2xl underline font-bold mb-2 text-pink-500">
                {sectionName}:
              </span>
              <ul>
                {Object.entries(sectionData).map(([field, value]) => (
                  <li key={field}>
                    <span className="text-white">{field}:</span>{" "}
                    <span className="text-pink-500">{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageDetails;
