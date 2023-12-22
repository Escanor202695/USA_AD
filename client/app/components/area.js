import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import axios from "../../utils/axios";
import Country from './country';

const Area = () => {
  const [countries, setCountries] = useState();
  const [needFetch, setNeedFetch] = useState(false);

  const fetchData = async () => {
    const response = await axios.get(
      "/dynamicform/country-state-city"
    );
    const data = response.data?.countries;
    setCountries(data);
  };

  const toggleNeedFetch = () => {
    setNeedFetch(!needFetch);
  }

  useEffect(() => {
    fetchData();
  }, [needFetch]);

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto flex-1 overflow-y-scroll">
      <div className="flex justify-center py-10">
        <h1 className="text-[#f04d99]  text-2xl   border-2 border-[#f04d99] hover:text-[#bd7ee5]  p-2 rounded-md">
          Select Location Below
        </h1>
      </div>
      <Country countries={countries} refetch={toggleNeedFetch} />
    </div>
  );
};

export default Area;
