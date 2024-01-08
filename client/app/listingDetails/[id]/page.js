// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import ImageDetails from "../../components/imageDetails";
import NavBar from "../../components/navbar";
import Loader from "../../components/svg/loader";

const YourPage = ({ params }) => {
  const formdataId = params.id;
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/${formdataId}`
        );
        const data = await response.json();
        console.log("Data fetched:", data);
        setFormData(data);
        setTimeout(() => {
          setLoading(false); // Set loading to false after data is fetched
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, [formdataId]);
  return (
    <div className="bg-black">
      <NavBar />
      {loading && (
        <div className="bg-black h-full">
          <Loader />
        </div>
      )}
      {!loading && (
        <div className="pt-[100px]">
          {formData && (
            <ImageDetails
              images={formData?.data["Ad info"]["Upload images"]}
              contactInfo={formData?.data["Contact Info"]}
              adInfo={formData?.data["Ad info"]}
            />
          )}
          <p className="text-pink-500 mt-4 ml-4">
            <span className="text-lg text-white  underline">Disclaimer:</span>{" "}
            <br />
            Hello, we are a good company
          </p>
        </div>
      )}
    </div>
  );
};

export default YourPage;
