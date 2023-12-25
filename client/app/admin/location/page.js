"use client";

import NavBar from "../../components/navbar";
import Area from "../../components/area";
import Footer from "../../components/footer";



export default function LocationPage() {

  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-full bg-black  h-auto">
        <NavBar/>
        <Area />
        <Footer/>
      </div>
    </>
  );
}
