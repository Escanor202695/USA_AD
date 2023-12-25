"use client";

import {
  ArrowLeftOnRectangleIcon,
  CalendarIcon,
  UserIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Users", href: "/admin/users", icon: UsersIcon },
  { name: "Requests", href: "/admin/requests", icon: UserIcon },
  {
    name: "Schedules",
    href: "/admin/schedules",
    icon: CalendarIcon,
  },
  {
    name: "Log out",
    href: "#",
    icon: ArrowLeftOnRectangleIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    console.log("token");
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  return (
    <div className="hidden lg:flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 h-[100vh] w-[250px] max-w-[300px]">
      <div className="flex h-16 shrink-0 items-center">
        <img className="h-12 w-auto" src="/logo.png" alt="Your Company" />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name} onClick={item.href == "#" ? logout : null}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
