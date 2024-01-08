// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import ImageDetails from "../../components/imageDetails";
import NavBar from "../../components/navbar";
import Loader from "../../components/svg/loader";
import Link from "next/link";
import CardImage from "../../components/cardImage";
import Footer from "../../components/footer";
const YourPage = ({ params }) => {
  const formdataId = params.id;
  const [formData, setFormData] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [cityName, setCityName] = useState(null); // Use useState for cityName

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
        const fetchedCityName = data?.data["Contact Info"].City;
        setCityName(fetchedCityName);
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

  useEffect(() => {
    if (cityName) {
      const fetchDataCity = async () => {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/city/${cityName}`
          );
          const data = await response.json();
          // Simulate a delay for the loader (replace with your actual fetch logic)
          console.log(data);
          setCityData(data);
          setLoading(false); // Set loading to false after data is fetched
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false); // Set loading to false in case of an error
        }
      };

      fetchDataCity();
    }
  }, [cityName]);
  return (
    <>
      <div className="bg-[#101827] px-5">
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
                formData={formData} 
              />
            )}
          </div>
        )}
        {!loading && cityData?.length > 0 && (
          <div className=" p-4 mt-[50px] mb-10 h-auto">
            <h1 className="text-white text-3xl mb-8 text-center capitalize">
              Related Listings
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {cityData
                ?.filter((item) => item._id !== formdataId) // Filter out the current listing
                .map((item, index) => (
                  <div key={index} className="cursor-pointer">
                    <Link href={`/listingDetails/${item._id}`}>
                      <CardImage
                        item={item}
                        imageSrc={item.data["Ad info"]["Upload images"][0].url}
                        status={item.data["Ad info"]["Listing Category"]}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default YourPage;
