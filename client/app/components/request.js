"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Request({ requestType }) {
  const [center, setCenter] = useState("");
  const [city, setCity] = useState("");
  const [grade, setGrade] = useState("");
  const [rotation, setRotation] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [switchWith, setSwitchWith] = useState("");
  const [notPreferred, setNotPreferred] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleRequest = async (e) => {
    e.preventDefault();

    // Function to check if a value is not an empty string
    const isNotEmptyString = (value) =>
      typeof value === "string" && value.trim() !== "";

    // Check if all required fields have values

    console.log(message);

    if (
      (requestType === "rotation" &&
        isNotEmptyString(center) &&
        isNotEmptyString(city) &&
        isNotEmptyString(grade) &&
        isNotEmptyString(rotation) &&
        isNotEmptyString(from) &&
        isNotEmptyString(to)) ||
      (requestType === "leave" &&
        isNotEmptyString(from) &&
        isNotEmptyString(to)) ||
      (requestType === "oncall-switching" &&
        isNotEmptyString(switchWith) &&
        isNotEmptyString(from) &&
        isNotEmptyString(to)) ||
      (requestType === "general" && isNotEmptyString(message)) ||
      (requestType === "oncall" && isNotEmptyString(notPreferred))
    ) {
      try {
        const response = await axios.post(
          "https://o-ras.com/api/request",
          {
            type: requestType,
            center: center,
            city: city,
            grade: grade,
            desired_rotation: rotation,
            from: from,
            to: to,
            switching_resident_name: switchWith,
            not_preferred_dates: notPreferred,
            message: message,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        toast.success(response.data.message);
        router.push("/user/account");

        console.log(response.data);
      } catch (error) {
        // Handle signup error
        console.error("Signup failed:", error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      // Show a toast or alert indicating that all fields are required
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="w-[600px] max-w-full">
      <div className="flex flex-1 flex-col justify-center py-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            {requestType == "rotation" && (
              <>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Center
                  </label>
                  <div className="mt-2">
                    <input
                      id="center"
                      name="center"
                      type="text"
                      autoComplete="center"
                      required
                      value={center}
                      onChange={(e) => setCenter(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      autoComplete="city"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Grade
                  </label>
                  <div className="mt-2">
                    <input
                      id="grade"
                      name="grade"
                      type="text"
                      autoComplete="grade"
                      onChange={(e) => setGrade(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rotation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Desired Rotation
                  </label>
                  <div className="mt-2">
                    <input
                      id="rotation"
                      name="rotation"
                      type="text"
                      autoComplete="rotation"
                      value={rotation}
                      onChange={(e) => setRotation(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            {(requestType == "rotation" ||
              requestType == "leave" ||
              requestType == "oncall-switching") && (
              <>
                <div>
                  <label
                    htmlFor="rotation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    From Date:
                  </label>
                  <div className="mt-2">
                    <input
                      id="from"
                      name="from"
                      type="date"
                      autoComplete="from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rotation"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    To Date
                  </label>
                  <div className="mt-2">
                    <input
                      id="to"
                      name="to"
                      type="date"
                      autoComplete="to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            {requestType == "oncall-switching" && (
              <>
                <div>
                  <label
                    htmlFor="switching_with"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {`Resident's Name (switching with)`}
                  </label>
                  <div className="mt-2">
                    <input
                      id="switch_with"
                      name="switch_with"
                      type="text"
                      autoComplete="switch_with"
                      value={switchWith}
                      onChange={(e) => setSwitchWith(e.target.value)}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </>
            )}

            {requestType == "oncall" && (
              <div>
                <label
                  htmlFor="not_preferred"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Not Preferred Dates (use comma for multiple)
                </label>
                <div className="mt-2">
                  <input
                    id="not_preferred"
                    name="not_preferred"
                    type="text"
                    autoComplete="not_preferred"
                    value={notPreferred}
                    onChange={(e) => setNotPreferred(e.target.value)}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Message
              </label>
              <div className="mt-2">
                <textarea
                  id="message"
                  name="message"
                  type="text"
                  autoComplete="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleRequest}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
