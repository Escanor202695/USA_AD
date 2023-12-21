"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebarAdmin";
import MobileHeader from "@/app/components/mobileHeader";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const router = useRouter();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("https://o-ras.com/api/auth/allusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(response.data);
      setLoading(false); // Set loading to false once data is fetched
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong!");
      setLoading(false); // Set loading to false on error as well
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://o-ras.com/api/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("User deleted successfully!");
      getUsers(); // Refresh user data after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="">
      <MobileHeader />
      <div className="flex">
        <Sidebar />
        <div className="flex flex-col items-center w-full p-8 h-[100vh] overflow-scroll">
          <h1 className="text-3xl font-bold mb-4">All Users</h1>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <table className="max-w-full lg:w-[800px] mx-auto mt-[20px] bg-white border border-gray-300 rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                if (user.phone == "966566492006") return null;

                return (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b text-center">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </div>
  );
}
