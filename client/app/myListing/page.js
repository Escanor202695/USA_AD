// YourPage.js
"use client";
import React, { useEffect, useState } from "react";
import CardImage from "../components/cardImage";
import Link from "next/link";
import Empty from "../components/empty";
const YourPage = () => {
  let email;
  let username;
  if (typeof window == "undefined") {
  } else {
    email = localStorage.getItem("useremail");
    username = localStorage.getItem("username");
  }

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
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return (
    <div className="bg-[#2a2a2b] p-10 pt-[120px] min-h-[100vh] h-auto">
      <h1 className="text-white text-3xl font-semibold ">Your Listing</h1>

      {loading && <p>Loading...</p>}

      {!loading && formData?.length === 0 && (
        <Empty title="No Listing Available" />
      )}

      {!loading && formData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {formData.map((item, index) => (
            <div key={index} className="cursor-pointer">
              <Link href={`/listingDetails/${item._id}`}>
                <CardImage
                  imageSrc={item.data["Ad info"]["Upload images"][0].url}
                  cityName={item.data["Contact Info"]["City"]}
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
