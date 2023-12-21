"use client";

import React from "react";
import Sidebar from "../../components/sidebar";
import MobileHeader from "../../components/mobileHeader";

function Home(props) {
  return (
    <>
      <MobileHeader />
      <div className="flex ">
        <Sidebar page="home" />

        {/* Main Content */}
        <div className="flex-1 h-[100vh] p-6 px-[20px] lg:px-[50px] w-[700px] border-2 mx-auto overflow-scroll">
          {/* Logo and Welcome Section */}
          <div className="flex items-center justify-center mb-8 flex-col">
            <img
              src="/logo.png"
              alt="Logo"
              className="w-[100px] h-16 mr-4 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold mb-4">Welcome To Our Website</h1>
          </div>
          <div>
            <p className="text-gray-700">
              I am excited to provide you with a user-friendly platform that
              caters specifically to the needs of our esteemed doctors. This
              portal is designed to streamline your experience, making it easier
              for you to access essential information and manage your schedules
              efficiently.
              <br />
              <br />
              With your personalized account, you will have 24/7 access to your
              schedule of events and on-call schedule.
              <br />
              <br />
              In addition to viewing your schedule, you can also request changes
              to your on-calls directly through the portal. Our advanced
              workflow system ensures that your requests are handled promptly
              and efficiently. You can easily track the status of your request
              and stay informed throughout the process.
              <br />
              <br />
              We understand that navigating a new system may sometimes be
              challenging. That&apos;s why I am here to assist you every step of
              the way. I am dedicated to providing you with the support you
              need. If you have any questions or require any assistance, please
              feel free to contact me using the details provided below.
              <br />
              <br />
              Thank you for using oras. I hope this platform enhances your
              experience and empowers you to deliver exceptional care to our
              patients.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
