"use client";

import React from "react";
import Footer from "../components/footer";
import Location from "../components/location";
import NavBar from "../components/navbar";
import CountryStateCityDemo from "../components/addLocation";
import AddLocation from "../components/addLocation";

function Home(props) {
  return (
    <>
      <div className="bg-[#101827] h-auto ">
        <Location />
        <Footer />
      </div>
    </>
  );
}

export default Home;