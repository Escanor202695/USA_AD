import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Pen from "./svg/pen";
import ProfileIcon from "./svg/profile";
import Key from "./svg/key";

const navigation = [{ name: "Home", href: "/home" }];

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
  }, [token]);

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
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12 items-center mr-16">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-md font-semibold leading-6 text-white hover:text-[#F04D99]"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden sm:flex items-center">
          {token ? (
            <>
              <button
                className="flex items-center text-white bg-[#F04D99] px-4 py-2 rounded-sm"
                onClick={() => router.push("/post-add")}
              >
                <Pen />
                Post New Ad
              </button>
              <button
                className="flex items-center text-white bg-[#F04D99] px-4 py-2 ml-4 rounded-sm"
                onClick={() => router.push("/profile")}
              >
                <ProfileIcon />
                Profile
              </button>
              <button
                className="ml-4 flex items-center text-white bg-[#F04D99] px-4 py-2 rounded-sm"
                onClick={handleLogout}
              >
                <Key />
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="flex items-center text-white bg-[#F04D99] px-4 py-2 mr-4 rounded-sm"
                onClick={() => router.push("/")}
              >
                <Pen />
                Post New Ad
              </button>
              <button
                className="flex items-center text-white bg-[#F04D99] px-4 py-2 rounded-sm"
                onClick={() => router.push("/user/signup")}
              >
                <ProfileIcon />
                Register
              </button>
              <button
                className="ml-4 flex items-center text-white bg-[#F04D99] px-4 py-2 rounded-sm"
                onClick={() => router.push("/")}
              >
                <Key />
                Login
              </button>
            </>
          )}
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
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-[#F04D99]"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="sm:hidden flex-col">
            {token ? (
              <>
                <button
                  className="flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={() => router.push("/post-add")}
                >
                  <Pen />
                  Post New Ad
                </button>
                <button
                  className="flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={() => router.push("/profile")}
                >
                  <ProfileIcon />
                  Profile
                </button>
                <button
                  className="flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={handleLogout}
                >
                  <Key />
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={() => router.push("/")}
                >
                  <Pen />
                  Post New Ad
                </button>
                <button
                  className="flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={() => router.push("/user/signup")}
                >
                  <ProfileIcon />
                  Register
                </button>
                <button
                  className=" flex items-center text-white bg-[#F04D99] px-4 py-2 my-2 rounded-sm"
                  onClick={() => router.push("/user/login")}
                >
                  <Key />
                  Login
                </button>
              </>
            )}
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default NavBar;
