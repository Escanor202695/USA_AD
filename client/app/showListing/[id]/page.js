// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import ImageGrid from "../../components/imageGrid";
import NavBar from "../../components/navbar";
import CardImage from "../../components/cardImage";
import Link from "next/link";

const YourPage = ({ params }) => {
  const cityName = params.id;

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/city/${cityName}`
        );
        const data = await response.json();
        // console.log("Data fetched:", data);
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <>
      <NavBar />
      <div className="bg-black p-4 pt-[100px]  min-h-[100vh] h-auto">
        <h1 className="text-white">{cityName}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {formData?.map((item, index) => {
            return (
              <div key={index} className="cursor-pointer">
                <Link href={`/listingDetails/${item._id}`}>
                  <CardImage
                    imageSrc={item.data["Ad info"]["Upload images"][0].url}
                    cityName={cityName}
                    status={item.data["Ad info"]["Listing Category"]}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default YourPage;
