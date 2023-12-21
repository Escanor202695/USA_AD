"use client";

import Sidebar from "@/app/components/sidebarAdmin";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import MobileHeader from "@/app/components/mobileHeader";
import axios from "axios";

function Schedules(props) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user/login");
    }
  });

  const handleUpload = async (schedule, file) => {
    const formData = new FormData();
    formData.append("schedule", file);

    try {
      // Make a POST request to your login API endpoint
      const response = await axios.post(
        `https://o-ras.com/api/schedule/${schedule}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data);
      toast.success("file upload successfully");
    } catch (error) {
      // Handle login error
      console.error("Upload failed:", error);
      toast.error("Upload Failed!");
    }
  };

  const getFile = async (schedule) => {
    try {
      // Make a POST request to your login API endpoint

      console.log("schedule");
      const response = await axios.get(
        `https://o-ras.com/api/schedule/${schedule}/download`,
        { responseType: "blob" }
      );

      saveAs(response.data, `${schedule}_schedule.pdf`);

      console.log(response.data);
    } catch (error) {
      // Handle login error
      console.error("Download failed:", error.response);
      toast.error("Schedule doenst exist!");
    }
  };

  const triggerFileInput = (schedule) => {
    const fileInput = document.getElementById(`fileInput-${schedule}`);
    fileInput.click();
  };

  const schedules = [
    {
      name: "Weekly Schedule",
      value: "weekly",
      url: () => {
        getFile("weekly");
      },
    },
    {
      name: "Oncall Schedule",
      value: "oncall",
      url: () => {
        getFile("oncall");
      },
    },
    {
      name: "Thursday Activity",
      value: "thursday",
      url: () => {
        getFile("thursday");
      },
    },
    {
      name: "Tuesday Activity",
      value: "tuesday",
      url: () => {
        getFile("tuesday");
      },
    },
    {
      name: "Animal Lab Activity",
      value: "animal",
      url: () => {
        getFile("animal");
      },
    },
    {
      name: "Master Rota",
      value: "master",
      url: () => {
        getFile("master");
      },
    },
    {
      name: "Eid Coverage",
      value: "eid",
      url: () => {
        getFile("eid");
      },
    },
    {
      name: "Simulation center",
      value: "simulation",
      url: () => {
        getFile("simulation");
      },
    },
  ];

  return (
    <>
      <MobileHeader role="admin" />

      <div className="flex">
        <Sidebar page="home" />
        <div className="flex-1 h-[100vh] flex items-center flex-col p-[20px] md:p-[50px]">
          <h1 className="text-3xl font-bold mb-8">Schedules</h1>
          {schedules.map((s, idx) => {
            return (
              <div
                className="w-full lg:w-[600px] flex justify-between items-center p-1 px-2 my-4 border-2 rounded-lg"
                key={idx}
              >
                <p>{s.name}</p>
                <div className="flex items-center max-w-full w-[200px] gap-4">
                  <button
                    type="submit"
                    onClick={s.url}
                    className="flex w-full justify-center rounded-md bg-indigo-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => triggerFileInput(s.value)}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Upload
                  </button>
                  <input
                    id={`fileInput-${s.value}`}
                    type="file"
                    accept=".pdf"
                    onChange={(e) => handleUpload(s.value, e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Schedules;
