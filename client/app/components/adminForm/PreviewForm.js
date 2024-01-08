import React from "react";
import { Modal, Form, Input, Checkbox, Radio, Button } from "antd";
import ClientForm from "./ClientForm";
import axios from "../../../utils/axios";

const PreviewModal = ({ open, onCancel, formValues }) => {
  const saveForm = async () => {
    const res = await axios.post("dynamicform/form", {
      name: "v1",
      data: formValues,
    });
    console.log(res.data);
    onCancel();
  };
  return (
    <Modal
      title={
        <h1 style={{ fontSize: "20px", margin: 0 }}>Preview Form</h1> 
      }
      open={open}
      onCancel={onCancel}
      footer={null} // Remove the default footer
    >
      <div className="">
        <ClientForm preview={true} formValues={formValues} />
        <button
          onClick={saveForm}
          className="flex bg-[#F04D99] text-white rounded-md mt-6 py-2 px-4 mx-auto mb-2"
        >
          Save Form
        </button>
      </div>
    </Modal>
  );
};

export default PreviewModal;
