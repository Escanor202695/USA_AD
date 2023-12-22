import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import axios from "../../utils/axios";

const Location = () => {

  const [countries, setCountries] = useState();

  const fetchData = async () => {
    const response = await axios.get(
      "/dynamicform/country-state-city"
    );
    const data = response.data?.countries;
    setCountries(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pt-[100px] flex-1 pb-[50px] w-[80%] md:w-[60%] mx-auto">
      <div className="flex justify-center py-10">
        <h1 className="text-[#f04d99]  text-2xl   border-2 border-[#f04d99] hover:text-[#bd7ee5]  p-2 rounded-md">
          Select Location Below
        </h1>
      </div>
      {countries?.map((country, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#f04d99] relative">
              {country?.name}
              <span className="block absolute  left-1 w-[10%] h-[2px] bg-white" />
            </h2>
          </div>

          <div className="flex flex-wrap grow-0">
            {country?.states
              .sort((a, b) => a?.name.localeCompare(b?.name))
              .map((state, index) => (
                <div
                  key={index}
                  className={`md:w-1/4 sm:w-1/2 ${index % 4 === 3 ? "md:w-1/4" : ""
                    } p-2`}
                >
                  <div className=" text-white py-2 rounded-md cursor-pointer">
                    <div className="text-[#bd7ee5] font-bold">{state?.name}</div>
                  </div>

                  <div>
                    {state?.cities.map((city, index) => (
                      <Link key={index} href={`/page4e/${city?.name?.toLowerCase()}`}>
                        <motion.div
                          className="flex items-center text-[#f04d99] rounded-md cursor-pointer"
                          whileHover={{ x: 50 }}
                        >
                          {city.name}
                          <span>
                            <FaChevronRight />
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {countries?.map((country, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#f04d99] relative">
              {country?.name}
              <span className="block absolute  left-1 w-[10%] h-[2px] bg-white" />
            </h2>
          </div>

          <div className="flex flex-wrap grow-0">
            {country?.states
              .sort((a, b) => a?.name.localeCompare(b?.name))
              .map((state, index) => (
                <div
                  key={index}
                  className={`md:w-1/4 sm:w-1/2 ${index % 4 === 3 ? "md:w-1/4" : ""
                    } p-2`}
                >
                  <div className=" text-white py-2 rounded-md cursor-pointer">
                    <div className="text-[#bd7ee5] font-bold">{state?.name}</div>
                  </div>

                  <div>
                    {state?.cities.map((city, index) => (
                      <Link key={index} href={`/page4e/${city?.name?.toLowerCase()}`}>
                        <motion.div
                          className="flex items-center text-[#f04d99] rounded-md cursor-pointer"
                          whileHover={{ x: 50 }}
                        >
                          {city.name}
                          <span>
                            <FaChevronRight />
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {countries?.map((country, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#f04d99] relative">
              {country?.name}
              <span className="block absolute  left-1 w-[10%] h-[2px] bg-white" />
            </h2>
          </div>

          <div className="flex flex-wrap grow-0">
            {country?.states
              .sort((a, b) => a?.name.localeCompare(b?.name))
              .map((state, index) => (
                <div
                  key={index}
                  className={`md:w-1/4 sm:w-1/2 ${index % 4 === 3 ? "md:w-1/4" : ""
                    } p-2`}
                >
                  <div className=" text-white py-2 rounded-md cursor-pointer">
                    <div className="text-[#bd7ee5] font-bold">{state?.name}</div>
                  </div>

                  <div>
                    {state?.cities.map((city, index) => (
                      <Link key={index} href={`/page4e/${city?.name?.toLowerCase()}`}>
                        <motion.div
                          className="flex items-center text-[#f04d99] rounded-md cursor-pointer"
                          whileHover={{ x: 50 }}
                        >
                          {city.name}
                          <span>
                            <FaChevronRight />
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
      {countries?.map((country, index) => (
        <div key={index}>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#f04d99] relative">
              {country?.name}
              <span className="block absolute  left-1 w-[10%] h-[2px] bg-white" />
            </h2>
          </div>

          <div className="flex flex-wrap grow-0">
            {country?.states
              .sort((a, b) => a?.name.localeCompare(b?.name))
              .map((state, index) => (
                <div
                  key={index}
                  className={`md:w-1/4 sm:w-1/2 ${index % 4 === 3 ? "md:w-1/4" : ""
                    } p-2`}
                >
                  <div className=" text-white py-2 rounded-md cursor-pointer">
                    <div className="text-[#bd7ee5] font-bold">{state?.name}</div>
                  </div>

                  <div>
                    {state?.cities.map((city, index) => (
                      <Link key={index} href={`/page4e/${city?.name?.toLowerCase()}`}>
                        <motion.div
                          className="flex items-center text-[#f04d99] rounded-md cursor-pointer"
                          whileHover={{ x: 50 }}
                        >
                          {city.name}
                          <span>
                            <FaChevronRight />
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Location;
