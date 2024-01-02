// ImageDetails.js
"use client";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ImageDetails = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  const contactInfo = {
    phone: "019-XXXXXXX",
    state: "Dhaka",
    // Add more contact information fields as needed
  };

  const basicInfo = {
    field1: "Value1",
    field2: "Value2",
    // Add more basic information fields as needed
  };

  const disclaimerText =
    "Disclaimer: This information is for demonstration purposes only.";

  return (
    <div className="flex p-4 min-h-[100vh]">
      <div className="w-2/3 pr-4">
        <ImageGallery items={images} />
        <p className="text-pink-500 mt-4">{disclaimerText}</p>
      </div>
      <div className="w-1/3">
        <div className="text-pink-500 mb-4">
          <h2>Contact Info</h2>
          <ul>
            {Object.entries(contactInfo).map(([field, value]) => (
              <li key={field}>
                <span className="text-white">{field}:</span>{" "}
                <span className="text-pink-500">{value}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-pink-500">
          <h2>Basic Info</h2>
          <ul>
            {Object.entries(basicInfo).map(([field, value]) => (
              <li key={field}>
                <span className="text-white">{field}:</span>{" "}
                <span className="text-pink-500">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImageDetails;
