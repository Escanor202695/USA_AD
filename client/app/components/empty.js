import React from "react";

function Empty({ title }) {
  return (
    <div className="h-full  flex-col flex justify-center items-center">
      <img src="/nodata-1.png" className=" h-60 md:h-80 lg:h-120" />
      <h1 className="text-white text-lg md:text-xl lg:text-3xl">{title}</h1>
    </div>
  );
}

export default Empty;
