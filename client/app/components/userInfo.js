import React from "react";
import UserIcon from "./svg/userCircle"; // Replace with the actual path to your user icon SVG

const UserInfo = () => {
  // Retrieve user information from localStorage
  let email, username, role;
  if (typeof window !== 'undefined') {
    email = localStorage.getItem("useremail");
    username = localStorage.getItem("username");
    role = localStorage.getItem("role");
  }
  return (
    <div className="flex min-h-full bg-[#101827] flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-[#F04D99]  ">
          User Profile
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center  space-x-4">
            <UserIcon />
            <div>
              <div className="text-xl font-semibold   rounded-sm my-2 leading-6 text-[#F04D99]  ">
                Email: <span className="text-white">{email}</span>
              </div>
              <div className="text-xl font-semibold   rounded-sm my-2 leading-6 text-[#F04D99]  ">
                Username: <span className="text-white">{username}</span>
              </div>
              <div className="text-xl font-semibold   rounded-sm my-2 leading-6 text-[#F04D99]  ">
                Role: <span className="text-white">{role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
