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

      <div className="bg-[#101827] flex flex-col h-auto min-h-[100vh] overflow-scroll overflow-x-hidden">
        <NavBar/>
        <Location />
        <Footer />
      </div>
    </>
  );
}

export default Home;
