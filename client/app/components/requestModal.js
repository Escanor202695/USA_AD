import React, { useState, useEffect } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "react-modal";

export default function MyModal({ data, open, setOpen, role, index, id ,getUserInfo}) {
  const [message, setMessage] = useState(data.reject_message);
  console.log("data", data.message);

  const renderRequestDetail = (label, value) => {
    return value && value!=="01/01/1970"? (
      <div className="flex justify-between mt-2">
        <p className="text-sm font-bold text-gray-700 mr-2">{label}:</p>
        <p className="text-sm text-gray-700 ">{value}</p>
      </div>
    ) : null;
  };

  const handleRequest = async (status) => {
    console.log(data);

    try {
      const response = await axios.patch(
        `https://o-ras.com/api/request/${data._id}`,
        { status: status, reject_message: message },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setOpen(false);
      console.log(response.data);
      toast.success("Request status updated!");
      getUserInfo();
      setOpen(false);
    } catch (error) {
      console.error(error.response);
    }
  };

  const customStyles = {
    content: {
      // Tailwind CSS styles can be added here
    },
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={() => setOpen(false)}
      className="w-[400px] max-w-full bg-white absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] pt-[40px] p-[20px] shadow-sm border-[1px] rounded-lg"
    >
      <div>
        <div className="flex justify-between text-xl text-center -mt-4 mb-6 font-semibold leading-6 text-gray-900">
          <p>Request Details</p>
          <p className="cursor-pointer" onClick={() => setOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </p>
        </div>

        <div className="mt-2 bg-white">
          {renderRequestDetail("Name", data.authUser?.name)}
          {renderRequestDetail("Email", data.authUser?.email)}
          {renderRequestDetail("Phone", data.authUser?.phone)}
          {renderRequestDetail("Request Type", data.type)}
          {renderRequestDetail(
            "Created At",
            new Date(data.createdAt).toLocaleDateString()
          )}
          {renderRequestDetail("Center", data.center)}
          {renderRequestDetail("City", data.city)}
          {renderRequestDetail("Grade", data.grade)}
          {renderRequestDetail("Desired Rotation", data.desired_rotation)}
          {renderRequestDetail(
            "From",
            new Date(data.from).toLocaleDateString()
          )}
          {renderRequestDetail("To", new Date(data.to).toLocaleDateString())}
          {renderRequestDetail("Not Preferred Dates", data.not_preferred_dates)}
          {renderRequestDetail("Message", data.message)}
        </div>


        {role !== "user" && data.status === "pending" && (
          <div className="bg-white">
            <textarea
              id="message"
              name="message"
              type="text"
              placeholder="Write message if you want to reject"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full mt-4 bg-white rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />

            <div className="flex gap-2 mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleRequest("accepted")}
              >
                Accept
              </button>
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => handleRequest("rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
