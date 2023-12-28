"use client";

import AdminForm from "../../components/adminForm/AdminForm";



export default function ManageFormPage() {

  const handleFormSubmit = (formValues) => {
    // Logic to handle the form submission (e.g., send data to the server)
    console.log('Form submitted with values:', formValues);
  };


  return (
    <>
      <div className="pt-[40px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
        <AdminForm onFormSubmit={handleFormSubmit} />
        {/* <Area /> */}
      </div>
    </>
  );
}
