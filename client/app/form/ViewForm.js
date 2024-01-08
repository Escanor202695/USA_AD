"use client";
import React, { useEffect, useState } from "react";
import Loader from "../components/svg/loader"; // Import your loader component
import ClientForm from "../components/adminForm/ClientForm1";
import axios from "../../utils/axios";

const ViewForm = () => {
  const [formValues, setFormValues] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("/dynamicform/form/v1");
      const data = response.data?.data;
      setFormValues(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        // Render loader component while data is being fetched
        <Loader />
      ) : (
        // Render the content when data has been fetched
        <div className="md:p-[40px]">
          <div className="flex justify-center pt-[100px]">
            <h1 className="text-white text-3xl font-bold">Add your listing</h1>
          </div>
          <div className="pt-5 pb-[50px] w-[80%] md:w-[75%] mx-auto">
            <ClientForm preview={false} formValues={formValues} />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewForm;
