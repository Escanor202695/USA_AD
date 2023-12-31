import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Pen from "./svg/pen";
import ProfileIcon from "./svg/profile";
import Key from "./svg/key";
import Hamburger from "./svg/hamburger";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const handleLogout = async () => {
    await axios.get("/auth/local/logout");
    localStorage.removeItem("token");
    toast.success("LogOut Successful!");
    router.push("/");
  };
  const navigation = token
    ? [
        { name: "Home", href: "/home" },
        { name: "Post New Ad", href: "/form" },
        { name: "Profile", href: "/profile" },
        { name: "Logout", onClick: () => handleLogout() }, // Wrap handleLogout in an arrow function
      ]
    : [
        { name: "Home", href: "/home" },
        { name: "Post New Ad", href: "/form" },
        { name: "Register", href: "/user/signup" },
        { name: "Login", href: "/login" },
      ];

  const renderAuthButton = (label, icon, onClick) => (
    <button
      className="flex items-center text-white bg-[#F04D99] mr-2 px-4 py-2 my-2 rounded-lg"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-black">
      <nav
        className="flex items-center justify-between p-3 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1 items-center">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-16 w-auto" src="/logo.png" alt="" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#F04D99] bg-black"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Hamburger />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 items-center mr-16">
          {navigation.map((item) => (
            <React.Fragment key={item.name}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="text-md font-semibold leading-6 text-white hover:text-[#F04D99]"
                >
                  {item.name}
                </button>
              ) : (
                <a
                  href={item.href}
                  className="text-md font-semibold leading-6 text-white hover:text-[#F04D99]"
                >
                  {item.name}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="hidden  lg:flex items-center">
          <div className="  hidden">
            {token ? (
              <>
                {renderAuthButton("Post New Ad", <Pen />, () =>
                  router.push("/form")
                )}
                {renderAuthButton("Profile", <ProfileIcon />, () =>
                  router.push("/profile")
                )}
                {renderAuthButton("Logout", <Key />, handleLogout)}
              </>
            ) : (
              <>
                {renderAuthButton("Post New Ad", <Pen />, () =>
                  router.push("/form")
                )}
                {renderAuthButton("Register", <ProfileIcon />, () =>
                  router.push("/user/signup")
                )}
                {renderAuthButton("Login", <Key />, () =>
                  router.push("/login")
                )}
              </>
            )}
          </div>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-1/2 overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src="/path/to/logo.png" alt="" />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <React.Fragment key={item.name}>
                    {item.onClick ? (
                      <button
                        onClick={item.onClick}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#F04D99]"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#F04D99]"
                      >
                        {item.name}
                      </a>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div className="hidden flex-col">
            {token ? (
              <>
                {renderAuthButton("Post New Ad", <Pen />, () =>
                  router.push("/form")
                )}
                {renderAuthButton("Profile", <ProfileIcon />, () =>
                  router.push("/profile")
                )}
                {renderAuthButton("Logout", <Key />, handleLogout)}
              </>
            ) : (
              <>
                {renderAuthButton("Post New Ad", <Pen />, () =>
                  router.push("/")
                )}
                {renderAuthButton("Register", <ProfileIcon />, () =>
                  router.push("/user/signup")
                )}
                {renderAuthButton("Login", <Key />, () =>
                  router.push("/login")
                )}
              </>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBar;
