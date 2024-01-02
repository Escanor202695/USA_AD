// Profile.js
"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/sidebarAdmin";
import { useRouter } from "next/navigation";
import UserSidebar from "../components/userSideBar";

function Profile() {
  const router = useRouter();
  const role = localStorage.getItem("role");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    //
  }, []);

  return (
    <div className="w-full">
      {role === "admin" ? <Sidebar /> : <UserSidebar />}
    </div>
  );
}

export default Profile;
