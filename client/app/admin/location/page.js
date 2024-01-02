"use client";

import NavBar from "../../components/navbar";
import Area from "../../components/area";
import Footer from "../../components/footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LocationPage() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });
  return (
    <>
      <div className="flex flex-col min-h-[100vh] w-full bg-black  h-auto">
        <NavBar />
        <Area />
        <Footer />
      </div>
    </>
  );
}
