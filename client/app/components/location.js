import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";

const Location = () => {
  // Your existing code...
const countries = [
    {
      name: "Country A",
      states: [
        { name: "California", cities: ["City 1", "City 2", "City 3"] },
        { name: "blabama", cities: ["City 4", "City 5", "City 6"] },
        { name: "Alaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "Alaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "mlaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "flaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "Alaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "Alaska", cities: ["City 7", "City 8", "City 9"] },
        { name: "dlaska", cities: ["City 7", "City 8", "City 9"] },
      ],
    },
    // Add more countries as needed
  ];
  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <div className="flex justify-center py-10">
        <h1 className="text-[#f04d99]  text-2xl   border-2 border-[#f04d99] hover:text-[#bd7ee5]  p-2 rounded-md">
          Select Location Below
        </h1>
      </div>
      {countries.map((country) => (
        <div key={country.name}>
          <div>
            <h2 className="text-2xl font-bold mb-2 text-[#f04d99] relative">
              {country.name}
              <span className="block absolute  left-1 w-[10%] h-[2px] bg-white" />
            </h2>
          </div>

          <div className="flex flex-wrap">
            {country.states
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((state, index) => (
                <div
                  key={state.name}
                  className={`md:w-1/4 sm:w-1/2 ${
                    index % 4 === 3 ? "md:w-1/4" : ""
                  } p-2`}
                >
                  <div className=" text-white py-2 rounded-md cursor-pointer">
                    <div className="text-[#bd7ee5] font-bold">{state.name}</div>
                  </div>

                  <div>
                    {state.cities.map((city) => (
                      <Link key={city} href={`/page4e/${city.toLowerCase()}`}>
                        <motion.div
                          className="flex items-center text-[#f04d99] rounded-md cursor-pointer"
                          whileHover={{ x: 50 }}
                        >
                          {city}
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
