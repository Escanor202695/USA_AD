// YourPage.js
"use client"
import React from "react";
import ImageDetails from "../../components/imageDetails";
import NavBar from "../../components/navbar";

const YourPage = () => {
  const images = [
    { src: "/1.avif", width: 4, height: 3 },
    { src: "/logo.png", width: 3, height: 4 },
    // Add more images with appropriate width and height values
  ];

  return (
    <>
      <NavBar />
      <div className="bg-black">
        <ImageDetails images={images} />
      </div>
    </>
  );
};

export default YourPage;
