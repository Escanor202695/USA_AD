// CardImage.js
import React from "react";
import ImageDisplay from "../formdata/ImageDisplay";
import { MapPinIcon } from "@heroicons/react/24/solid";

const CardImage = ({ imageSrc, status, item }) => {
  return (
    <div>
      <div className="relative  border  border-pink-500 text-pink-500 group overflow-hidden">
        <ImageDisplay imageUrl={imageSrc} height={80} />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 ">
          <span className="text-sm font-bold text-white p-2 bg-pink-500">
            {status}
          </span>
        </div>
        <div className=" absolute group-hover:transform group-hover:-translate-x-1/2 group-hover:left-[50%] flex group-hover:justify-center bottom-2 transform group-hover:flex group-hover:font-bold transition-transform duration-300">
          <span className=" hidden group-hover:flex text-md group-hover:text-lg justify-center text-white z-50">
            {item?.data["Ad info"]["Title"]}
          </span>
        </div>
      </div>
      <div className="!font-semibold text-pink-500 justify-center items-center gap-2 text-xl flex py-1">
        <span> <MapPinIcon className="h-6 w-6"/> </span>
        {item?.data["Contact Info"]["Location"]}
      </div>
    </div>
  );
};

export default CardImage;
