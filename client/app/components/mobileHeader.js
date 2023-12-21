"use client";

import React, { useState } from "react";
import {
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
  MenuIcon,
  HomeIcon,
  Bars3Icon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/outline";

const MobileHeader = ({ role }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const adminNav = [
    { name: "Users", href: "/admin/users", icon: UsersIcon },
    { name: "Requests", href: "/admin/requests", icon: UserIcon },
    {
      name: "Schedules",
      href: "/admin/schedules",
      icon: CalendarIcon,
    },
    {
      name: "Log out",
      href: "/admin/login",
      icon: ArrowLeftOnRectangleIcon,
      logout: true,
    },
  ];

  const nav = [
    {
      name: "Home",
      href: "/user/home",
      icon: HomeIcon,
      count: "5",
    },
    { name: "Account", href: "/user/account", icon: UserIcon, current: false },
    {
      name: "Schedules",
      href: "/user/schedules",
      icon: CalendarIcon,
    },
    {
      name: "Make Request",
      href: "/user/make_request",
      icon: InboxArrowDownIcon,
    },
    {
      name: "Log out",
      href: "/user/login",
      icon: ArrowLeftOnRectangleIcon,
      logout: true,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
  };

  return (
    <header className=" lg:hidden bg-gray-900 text-white p-4 flex justify-between items-center">
      {/* Left Side: Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png" // Replace with the path to your logo
          alt="Logo"
          className="w-[100px] h-10 mr-2 object-contain" // Adjust the size as needed
        />
      </div>

      {/* Right Side: Burger Menu */}
      <div className="flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex items-center justify-center">
          <nav className="flex flex-col text-white text-left">
            {role !== "admin" &&
              nav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 px-4 hover:bg-gray-700"
                  onClick={item.logout ? logout : null}
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5 inline-block mr-2" />
                  )}
                  {item.name}
                </a>
              ))}
            {role == "admin" &&
              adminNav.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="py-2 px-4 hover:bg-gray-700"
                >
                  {item.icon && (
                    <item.icon className="w-5 h-5 inline-block mr-2" />
                  )}
                  {item.name}
                </a>
              ))}
          </nav>
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 text-white focus:outline-none"
          >
            Close
          </button>
        </div>
      )}
    </header>
  );
};

export default MobileHeader;
