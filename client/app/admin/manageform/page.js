"use client";

import AdminForm from "../../components/adminForm/AdminForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ManageFormPage() {
  const handleFormSubmit = (formValues) => {
    // Logic to handle the form submission (e.g., send data to the server)
    console.log("Form submitted with values:", formValues);
  };

  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  });
  return (
    <>
      <div className="pt-[40px] pb-[50px] w-[80%] md:w-[75%] mx-auto ">
        <AdminForm onFormSubmit={handleFormSubmit} />
        {/* <Area /> */}
      </div>
    </>
  );
}
