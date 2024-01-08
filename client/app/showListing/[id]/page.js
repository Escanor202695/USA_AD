// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import ImageGrid from "../../components/imageGrid";
import NavBar from "../../components/navbar";
import CardImage from "../../components/cardImage";
import Link from "next/link";
import Loader from "../../components/svg/loader";
import Empty from "../../components/empty";

const YourPage = ({ params }) => {
  const cityName = decodeURIComponent(params.id);

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/city/${cityName}`
        );
        const data = await response.json();
        // Simulate a delay for the loader (replace with your actual fetch logic)

        setFormData(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, [cityName]);

  return (
    <>
      <NavBar />
      {loading && (
        <div className="bg-black h-full">
          <Loader />
        </div>
      )}
      {!loading && formData.length > 0 && (
        <div className="bg-black p-4 pt-[100px] min-h-[100vh] h-auto">
          <h1 className="text-white capitalize">{cityName}</h1>
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
      )}
      {formData?.length === 0 && 
        
        (
          <div className="bg-black h-full">
          <Empty title="No listing Available"/>
          </div>
          )}
    </>
  );
};

export default YourPage;
