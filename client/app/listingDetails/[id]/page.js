// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import ImageDetails from "../../components/imageDetails";
import NavBar from "../../components/navbar";

const YourPage = ({ params }) => {
  const formdataId = params.id;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/${formdataId}`
        );
        const data = await response.json();
        console.log("Data fetched:", data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [formdataId]);

  const mapDataForImageDetails = () => {
    if (!formData || !formData.data["Ad info"]["Upload images"]) {
      return [];
    }

    return formData.data["Ad info"]["Upload images"].map((image) => ({
      original: image.url,
      thumbnail: image.url,
    }));
  };

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

  return (
    <div className="bg-black">
      {/* <NavBar /> */}
      <div className="pt-[100px]">
        {formData && (
          <ImageDetails images={formData?.data["Ad info"]["Upload images"]}
            contactInfo={formData?.data["Contact Info"]}
            adInfo={formData?.data["Ad info"]}
          />
        )}
      </div>
    </div>
  );
};

export default YourPage;
