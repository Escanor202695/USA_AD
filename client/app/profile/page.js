// Profile.js
"use client";
// Profile.js
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebarAdmin";
import { useRouter } from "next/navigation";
import UserSidebar from "../components/userSideBar";
import Loader from "../components/svg/loader"
function Profile() {
  const router = useRouter();
  const [role, setRole] = useState(null); // Use state to track the role
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    let token;
    let userRole;
    if (typeof window == "undefined") {
      setLoading(false); // Set loading to false when component initializes
    } else {
      token = localStorage.getItem("token");
      userRole = localStorage.getItem("role");
    }

    if (!token) {
      router.push("/login");
    } else {
      setRole(userRole); // Set the role state
      setLoading(false); // Set loading to false after initializing the role
    }
  }, [router]);

  return (
    <div className="w-full">
      {loading ? (
      <Loader/>
      ) : (
        // Render the Sidebar based on the role
        <div className="w-full">
          {role === "admin" ? <Sidebar /> : <UserSidebar />}
        </div>
      )}
    </div>
  );
}

export default Profile;
