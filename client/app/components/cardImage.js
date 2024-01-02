// CardImage.js
import React from "react";

const CardImage = ({ imageSrc, cityName, status }) => {
  return (
    <div className="relative bg-black border border-pink-500 text-pink-500">
      <img src={imageSrc} alt={cityName} className="w-full h-40 object-cover" />
      <div className="absolute top-0 right-0 p-2">
        <span className="text-sm font-semibold text-white bg-pink-500 ">
          {status}
        </span>
      </div>
      <div className="p-2">
        <span className="text-sm">{cityName}</span>
      </div>
    </div>
  );
};

export default CardImage;
