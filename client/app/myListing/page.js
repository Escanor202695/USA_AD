// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import CardImage from "../components/CardImage";
import Link from "next/link";

const YourPage = () => {
  const email = localStorage.getItem("useremail");

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/formdata/email/${email}`
        );
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="bg-black p-4 pt-[100px] min-h-[100vh] h-auto">
      <h1 className="text-white">{localStorage.getItem("username")}</h1>
      
      {loading && <p>Loading...</p>}
      
      {!loading && !formData && <p>You have no listing to see.</p>}

      {!loading && formData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {formData.map((item, index) => (
            <div key={index} className="cursor-pointer">
              <Link href={`/listingDetails/${item._id}`}>
                <CardImage
                  imageSrc={item.data["Ad info"]["Upload images"][0].url}
                  cityName={item.data["Contact info"]["City"]}
                  status={item.data["Ad info"]["Listing Category"]}
                />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourPage;