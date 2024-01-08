import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ChangePassword from "./changePassword";
import {
  ArrowLeftOnRectangleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ProfileNavBar from "./ProfileNavbar";
import UserInfo from "./userInfo";
import Form from "../form/ViewForm";
import MyListing from "../myListing/page";
import Pen from "./svg/pen";
const components = {
  "User Info": UserInfo,
  "Change Password": ChangePassword,
  "Post New Listing": Form,
  "My Listing": MyListing,
};

export default function UserSidebar() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("User Info");

  const handleMenuItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setSelectedItem("User Info");
    router.push("/login");
  };

  useEffect(() => {
    // Save the selected item to local storage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedItem", selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("token")) {
        router.push("/login");
      }
    }
  }, [router]);

  const menuItems = [
    { name: "User Info", icon: <UserIcon className="w-4 h-4" /> },
    { name: "Change Password", icon: <UserIcon className="w-4 h-4" /> },
    { name: "Post New Listing", icon: <Pen className="w-4 h-4" /> },
    { name: "My Listing", icon: <Pen className="w-2 h-2" /> },
    { name: "Log out", icon: <ArrowLeftOnRectangleIcon className="w-5 h-5" /> },
  ];

  const SelectedComponent = components[selectedItem] || (() => null);

  return (
    <>
      <ProfileNavBar
        items={menuItems}
        selectedItem={selectedItem}
        onSelect={handleMenuItemClick}
        logout={logout}
      />
      <div className="flex min-h-screen bg-[#2A2A2B] overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-600">
        <div className="hidden sm:flex-1 pt-[100px] lg:flex grow flex-col gap-y-5 overflow-y-auto  px-6 min-h-[100vh] w-1/5 min-w-[150px] bg-black">
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {menuItems.map((item) => (
                    <li
                      key={item.name}
                      onClick={() =>
                        item.name === "Log out"
                          ? logout()
                          : handleMenuItemClick(item.name)
                      }
                      className={
                        (item.name === selectedItem
                          ? "bg-[#F04D99]     "
                          : " ") +
                        " group flex items-center gap-x-3 cursor-pointer rounded-md text-white p-2 text-sm leading-6 font-semibold"
                      }
                    >
                      {item.icon}
                      {item.name}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
        <div className="w-full sm:w-4/5 min-h-screen bg-[#2a2a2b] overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-600">
          <SelectedComponent />
        </div>
      </div>
    </>
  );
}
