// Import necessary dependencies
import { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NavBar from "../../components/navbar";
import { Modal } from "antd"; // Import Ant Design Modal

export default function ManageListing() {
  const [adListings, setAdListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteAdListingId, setDeleteAdListingId] = useState(null); // Track adListing ID to delete
  const router = useRouter();

  useEffect(() => {
    getAdListings();
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

  const getAdListings = async () => {
    try {
      const response = await axios.get("/dynamicform/formdata");
      setAdListings(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching adListings:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const showDeleteModal = (id) => {
    setDeleteAdListingId(id);
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this adListing?",
      okText: "Delete",
      okButtonProps: { style: { background: "red", borderColor: "red" } },
      onOk: () => deleteAdListing(id),
    });
  };

  const deleteAdListing = async (id) => {
    try {
      await axios.delete(`/auth/${id}`);
      toast.success("Ad Listing deleted successfully!");
      getAdListings();
    } catch (error) {
      console.error("Error deleting adListing:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex pt-[100px] ">
        <div className="flex flex-col items-center w-full ">
          <h1 className="text-3xl font-bold mb-4 text-white">All Ad Listings</h1>
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <table className="max-w-full lg:w-[800px] text-left mx-auto mt-[20px] bg-white border border-gray-300 rounded-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Country</th>
                  <th className="py-2 px-4 border-b">States</th>
                  <th className="py-2 px-4 border-b">City</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>
              <tbody>
                {adListings.map((adListing) => (
                  <tr key={adListing._id}>
                    <td className="py-2 px-4 border-b">{adListing?.data["Contact Info"]?.Name}</td>
                    <td className="py-2 px-4 border-b">{adListing?.data["Contact Info"]?.Email}</td>
                    <td className="py-2 px-4 border-b">{adListing?.data["Contact Info"]?.Country}</td>
                    <td className="py-2 px-4 border-b">{adListing?.data["Contact Info"]?.State}</td>
                    <td className="py-2 px-4 border-b">{adListing?.data["Contact Info"]?.City}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => showDeleteModal(adListing._id)}
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