// Profile.js
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebarAdmin";
import { useRouter } from "next/navigation";
import UserSidebar from "../components/userSideBar";

function Profile() {
  const router = useRouter();
  const [role, setRole] = useState(null); // Use state to track the role

  useEffect(() => {
    let token;
    let userRole;
    if (typeof window == "undefined") {
    } else {
      token = localStorage.getItem("token");
      userRole = localStorage.getItem("role");
    }

    if (!token) {
      router.push("/login");
    } else {
      setRole(userRole); // Set the role state
    }
  }, [router]);

  return (
    <div className="w-full">
      {role === "admin" ? <Sidebar /> : <UserSidebar />}
    </div>
  );
}

export default Profile;
