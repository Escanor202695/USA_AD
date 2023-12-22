"use client";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

const ViewFormData = () => {
  const [formData, setFormData] = useState(null);
  const fetchData = async () => {
    const response = await axios.get("/dynamicform/formdata");
    const data = response.data;
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      {formData?.map((form, index) => {
        return (
          <div key={index}>
            {form?.data &&
              Object.keys(form?.data).map((key) => (
                <p key={key}>
                  {key}: {form.data[key]}
                </p>
              ))}
          </div>
        );
      })}
    </div>
  );
};

export default ViewFormData;
