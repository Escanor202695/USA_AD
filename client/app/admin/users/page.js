"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NavBar from "../../components/navbar";
import { Modal } from "antd"; // Import Ant Design Modal

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState(null); // Track user ID to delete
  const router = useRouter();

  useEffect(() => {
    getUsers();
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/auth/allusers");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const showDeleteModal = (id) => {
    setDeleteUserId(id);
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this user?",
      okText: "Delete",
      okButtonProps: { style: { background: "red", borderColor: "red" } },
      onOk: () => deleteUser(id),
    });
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/auth/${id}`);
      toast.success("User deleted successfully!");
      getUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex pt-[100px] ">
        <div className="flex flex-col items-center w-full ">
          <h1 className="text-3xl font-bold mb-4 text-white mt-[20px]">All Users</h1>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <table className="max-w-full lg:w-[800px] text-left mx-auto mt-[20px] bg-white border border-gray-300 rounded-md">
              <thead>
                <tr>
                <th className="py-2 px-4 border-b">Sl</th>

                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Role</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user,index) => (
                  <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{index+1}</td>

                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.role}</td>

                    <td className="py-2 px-4 border-b ">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => showDeleteModal(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
