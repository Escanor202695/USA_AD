"use client";

import Sidebar from "@/app/components/sidebar";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RequestModal from "@/app/components/requestModal";

import MobileHeader from "@/app/components/mobileHeader";

function Account(props) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState({});
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);
  const [data,setData] = useState({});
  const [reject, setReject] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading

  const getUserInfo = async () => {
    try {
      setLoading(true); // Set loading to true when starting API call

      // Make a POST request to your login API endpoint
      const response = await axios.get(
        `https://o-ras.com/api/auth/local/userdetails`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data._id) {
        const res = await axios.get(
          `https://o-ras.com/api/request/user/${response.data._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setRequests(res.data.reverse());
        console.log(res.data);
      }

      console.log(response.data);
      setUserDetails(response.data);
      setLoading(false); // Set loading to false when API call is finished
    } catch (error) {
      // Handle login error
      console.error("User info fetching failed:", error.response);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  // ... (the rest of your code remains unchanged)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user/login");
    }

    getUserInfo();
  }, []);

  function getStatusColor(status) {
    switch (status) {
      case "pending":
        return "rgba(255, 255, 0, 0.5)"; // light yellow with transparency
      case "accepted":
        return "rgba(0, 255, 0, 0.5)"; // light green with transparency
      case "rejected":
        return "rgba(255, 0, 0, 0.5)"; // light red with transparency
      default:
        return "transparent"; // default to transparent
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://o-ras.com/api/request/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Request has been deleted!");
      getUserInfo();
    } catch (error) {
      // Handle login error
      console.error(error.response);
      toast.error("Deletion Failed!");
    }
  };


  return (
    <>
      <MobileHeader role="user" />
      <div className="flex">
        <Sidebar page="home" />
        <div className="flex-1 h-[100vh] flex items-center flex-col p-[20px] md:p-[50px] overflow-scroll">
          <div className="w-full lg:w-[600px] p-4 mb-8 border-[.5px] shadow-sm rounded-lg">
            <h1 className=" text-3xl font-bold mb-4 text-center">Account Details</h1>
            <div className="flex mb-4 gap-2">
              <p className="font-semibold">Name:</p>
              <p>{userDetails.name}</p>
            </div>
            <div className="flex mb-4 gap-2">
              <p className="font-semibold">Email:</p>
              <p>{userDetails.email}</p>
            </div>
            <div className="flex mb-4 gap-2">
              <p className="font-semibold">Phone:</p>
              <p>{userDetails.phone}</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8">All Requests</h1>

          {/* Display loading text when loading */}
          {loading && <p>Loading...</p>}

          {/* Display message when there are no requests */}
          {!loading && requests.length === 0 && <p>No requests to show</p>}

          {requests.map((s, idx) => (
            <div
              className="w-full  lg:w-[600px] flex justify-between items-center p-2 my-2 border-[.5px] shadow-sm rounded-lg"
              key={idx}
              onClick={() => setData(s)}
            >
              <div className="flex gap-6">
                <p>{new Date(s.createdAt).toLocaleDateString()}</p>
                <p>{s.type}</p>
              </div>

              <div className="text-right flex gap-2 max-w-full items-center">
                <p
                  className="p-1 px-4 rounded-md"
                  style={{
                    backgroundColor: getStatusColor(s.status),
                  }}
                >
                  {s.status}
                </p>
                <button type="button" onClick={() => setOpen(true)}>
                  <EyeIcon className="text-black w-8 h-8 bg-slate-200 hover:bg-indigo-500 p-2 hover:text-white rounded-md" />
                </button>
                <button
                  type="submit"
                  onClick={() => handleDelete(s._id)}
                  className="text-black"
                >
                  <XMarkIcon className="text-black w-8 h-8 bg-slate-200 hover:bg-indigo-500 p-2 hover:text-white rounded-md" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <RequestModal data={data} open={open} setOpen={setOpen} role="user"/>
      </div>
    </>
  );
}

export default Account;
