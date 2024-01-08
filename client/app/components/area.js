import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Country from "./country";

const Area = () => {
  const [countries, setCountries] = useState();

  const fetchData = async () => {
    const response = await axios.get("/dynamicform/country-state-city");
    const data = response.data?.countries;
    setCountries(data);
    console.log('fetch called');
    return data;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto flex-1 ">
      <div className="flex justify-center py-10">
        <h1 className="text-3xl font-bold  text-white   p-2 rounded-md">
          Manage Location
        </h1>
      </div>
      <Country countries={countries} fetch={fetchData}/>
    </div>
  );
};

export default Area;
