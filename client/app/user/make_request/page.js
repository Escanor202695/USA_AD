"use client";

import Sidebar from "@/app/components/sidebar";
import React, { useEffect, useState } from "react";
import Request from "../../components/request";
import { useRouter } from "next/navigation";
import MobileHeader from "@/app/components/mobileHeader";

function MakeRequest(props) {
  const [requestType, setRequestType] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/user/login");
    }
  });

  useEffect(() => {
    console.log(requestType);
  }, [requestType]);

  return (
    <>
      <MobileHeader role="user" />
      <div className="flex">
        <Sidebar page="home" />
        <div className="flex-1 flex items-center flex-col h-[100vh] overflow-scroll p-[60px]">
          <h1 className="text-2xl font-bold mb-2">Make New Request</h1>
          <p className="text-gray-700 text-center text-sm mb-6">
            Select a request type first and then fill up the form
          </p>
          <div>
            <select
              id="location"
              name="location"
              className="mt-2 md:w-[385px] block max-w-full rounded-md border-0 py-1.5 pl-3 pr-10
             text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option disabled selected>
                Select Request Type
              </option>
              <option value="oncall-switching">
                On-call Switching Request
              </option>
              <option value="oncall">On-call Request</option>
              <option value="leave">Leave Request</option>
              <option value="rotation">Rotation In KFSH Request</option>
              <option value="general">General Request</option>
            </select>
          </div>

          {requestType != "" && <Request requestType={requestType} />}
        </div>
      </div>
    </>
  );
}

export default MakeRequest;
