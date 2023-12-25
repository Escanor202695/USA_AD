import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Country from "./country";

const Area = () => {
  const [countries, setCountries] = useState();
  const [needFetch, setNeedFetch] = useState(false);

  const fetchData = async () => {
    const response = await axios.get("/dynamicform/country-state-city");
    const data = response.data?.countries;
    setCountries(data);
  };

  const toggleNeedFetch = () => {
    setNeedFetch(!needFetch);
  };

  useEffect(() => {
    fetchData();
  }, [needFetch]);

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto flex-1 ">
      <div className="flex justify-center py-10">
        <h1 className="bg-[#f04d99]  text-xl  text-white  border-2 border-[#f04d99] hover:bg-[#bd7ee5]   p-2 rounded-md">
          Manage Location 
        </h1>
      </div>
      <Country countries={countries} refetch={toggleNeedFetch} />
    </div>
  );
};

export default Area;
