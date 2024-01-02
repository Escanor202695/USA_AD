// YourPage.js
"use client";
import React from "react";
import ImageGrid from "../../components/imageGrid";
import NavBar from "../../components/navbar";

const YourPage = ({params}) => {
  const cityName = params.id;
  const images = [
    { src: "/1.avif", cityName: "City A", status: "Premium" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City B", status: "Standard" },
    { src: "/1.avif", cityName: "City A", status: "Premium" },

    // Add more images as needed
  ];

  return (
    <>
      <NavBar />
      <div className="bg-black p-4 pt-[100px]  min-h-[100vh] h-auto">
      <h1 className="text-white">{cityName}</h1>
        <ImageGrid images={images} />
      </div>
    </>
  );
};

export default YourPage;
