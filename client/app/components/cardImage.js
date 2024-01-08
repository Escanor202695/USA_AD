// CardImage.js
import React from "react";
import ImageDisplay from "../formdata/ImageDisplay";

const CardImage = ({ imageSrc, cityName, status, item }) => {
  console.log("big");
  console.log(item);
  console.log("fish");

  return (
    <div className="relative bg-black border border-pink-500 text-pink-500 group">
      <ImageDisplay imageUrl={imageSrc} height={80} />
      {/* <img src={imageSrc} alt={cityName} className="w-full h-40 object-cover" /> */}
      <div className="absolute top-0 right-0 p-2">
        <span className="text-sm font-semibold text-white p-2  bg-pink-500 ">
          {status}
        </span>
      </div>
      <div className="p-2 absolute bottom-2  transform  hidden group-hover:block group-hover:font-bold">
        <span className="text-md group-hover:text-md text-center ">
          {cityName}
        </span>
        <div className="!font-semibold">
          {item?.data["Contact Info"]["Location"]}
        </div>
      </div>
    </div>
  );
};

export default CardImage;
