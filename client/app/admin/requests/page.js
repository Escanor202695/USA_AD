"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import RequestModal from "@/app/components/requestModal";
import SidebarAdmin from "@/app/components/sidebarAdmin";
import MobileHeader from "@/app/components/mobileHeader";

function Account(props) {
  const router = useRouter();
  const [requests, setRequests] = useState([]);
  const [data,setData]=useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true); // New state for loading

  const getUserInfo = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`https://o-ras.com/api/request`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const reversedRequests = response.data.reverse();
      setRequests(reversedRequests);

      console.log(response.data);
    } catch (error) {
      // Handle login error
      console.error(error.response);
    } finally {
      setLoading(false);
    }
  };

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
        return "rgba(255, 255, 0, 0.5)";
      case "accepted":
        return "rgba(0, 255, 0, 0.5)";
      case "rejected":
        return "rgba(255, 0, 0, 0.5)";
      default:
        return "transparent";
    }
  }

  return (
    <>
      <MobileHeader role="admin"/>
      <div className="flex">
        <SidebarAdmin page="home" />
        <div className="w-full flex-1 h-[100vh] flex items-center flex-col p-[20px] md:p-[50px] overflow-scroll">
          <h1 className="text-3xl font-bold mb-8">All Requests</h1>

          {/* Display loading text when loading */}
          {loading && <p>Loading...</p>}

          {/* Display message when there are no requests */}
          {!loading && requests.length === 0 && <p>No requests available.</p>}

          {requests.map((s, idx) => (
            <div
              className="w-full lg:w-[700px] flex justify-between items-center p-2 my-2 border-[.5px] shadow-sm rounded-lg"
              key={idx}
              onClick={() => setData(s)}
            >
              <div className="md:flex gap-4 justify-between flex-1 mr-4">
                <p className="font-medium">{s.authUser?.name}</p>
                <p>{s.type} request</p>
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
        <RequestModal data={data} open={open} setOpen={setOpen} getUserInfo={getUserInfo}/>
      </div>
    </>
  );
}

export default Account;
