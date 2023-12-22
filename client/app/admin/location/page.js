"use client";

import NavBar from "../../components/navbar";
import Area from "../../components/area";
import Footer from "../../components/footer";



export default function LocationPage() {

  return (
    <>
      <div className="flex flex-col h-[100vh]">
        <NavBar/>
        <Area />
        <Footer/>
      </div>
    </>
  );
}
