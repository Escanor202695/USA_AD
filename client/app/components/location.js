import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import axios from "../../utils/axios";
import Right from "./svg/right";
import Loader from "./svg/loader";

const Location = () => {
  const [countries, setCountries] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/dynamicform/country-state-city");
      const data = response.data?.countries;
      const sortedCountries = data?.sort((a, b) =>
        a?.name.localeCompare(b?.name)
      );

      // Sort states within each country alphabetically by name
      sortedCountries?.forEach((country) => {
        country.states.sort((a, b) => a?.name.localeCompare(b?.name));

        // Sort cities within each state alphabetically by name
        country.states.forEach((state) => {
          state.cities.sort((a, b) => a?.name.localeCompare(b?.name));
        });
      });

      setCountries(sortedCountries);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCityName = (cityName) => {
    const words = cityName.split(" ");
    const formattedName = words
      .reduce((result, word, index) => {
        const lineBreak =
          (index + 1) % 3 === 0 && index + 1 !== words.length ? "\n" : " ";
        return result + word + lineBreak;
      }, "")
      .trim();
    return formattedName;
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-[100px] flex-1 pb-[50px] w-[90%] md:w-[90%] mx-auto">
          <div className="flex justify-center py-10">
            <h1 className="text-[#f04d99]  text-2xl   border-2 border-[#f04d99] hover:text-[#bd7ee5]  p-2 rounded-md">
              Select Location Below
            </h1>
          </div>
          {countries?.map((country, index) => (
            <div key={index}>
              <h2 className="text-2xl  mb-1 text-[#f04d99]  relative after:block after:absolute after:left-0 after:w-[10%] after:h-[2px] after:bg-white">
                {country?.name}
              </h2>

              <div className="flex flex-wrap grow-0">
                {country?.states.map((state, index) => (
                  <div
                    key={index}
                    className={`md:w-1/4 sm:w-1/2 ${
                      index % 4 === 3 ? "md:w-1/4" : ""
                    } pt-1 !capitalize `}
                  >
                    <div className=" text-white  rounded-md ">
                      <div className="text-[#bd7ee5] text-[20px]">
                        {state?.name}
                      </div>
                    </div>

                    <div>
                      {state?.cities.map((city, index) => (
                        <Link
                          key={index}
                          href={`/showListing/${city?.name}`}
                          className="flex py-0 group items-center gap-0 hover:gap-2 hover:transform hover:transition-all hover:duration-150 hover:ease-in-out text-[#f04d99] hover:text-[#bd7ee5] rounded-md cursor-pointer text-[16px] "
                        >
                          <div>{formatCityName(city.name)}</div>
                          <div className="hidden group-hover:block">
                            <Right />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Location;
