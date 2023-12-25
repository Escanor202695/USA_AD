import React from "react";
import Link from "next/link";
import Right from "./svg/right";

const CountrySection = ({ country }) => {
  return (
    
                <Link
                  key={index}
                  href={`/page4e/${city?.name?.toLowerCase()}`}
                  className="flex py-0 group items-center gap-0 hover:gap-2 hover:transform hover:transition-all hover:duration-150 hover:ease-in-out text-[#f04d99] hover:text-[#bd7ee5] rounded-md cursor-pointer text-[16px] "
                >
                  <div>{city.name}</div>
                  <div className="hidden group-hover:block">
                    <Right />
                  </div>
                </Link>
             
  );
};

export default CountrySection;
