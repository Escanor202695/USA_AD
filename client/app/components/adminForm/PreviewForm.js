import React from 'react';
import { Modal, Form, Input, Checkbox, Radio, Button } from 'antd';
import ClientForm from './ClientForm';
import axios from '../../../utils/axios';

const PreviewModal = ({ open, onCancel, formValues }) => {

  const saveForm = async () => {
    const res = await axios.post('dynamicform/formdata', { name: "v1", data: formValues });
    console.log(res.data);
    onCancel();
  }
  return (
    <Modal
      title="Preview Form"
      open={open}
      onCancel={onCancel}
      footer={null} // Remove the default footer
    >
      <ClientForm preview={true} formValues={formValues} />
      <button onClick={saveForm} className="flex bg-cyan-200 rounded-md py-2 px-4 mx-auto mb-10">Save Form</button>
    </Modal>
  );
};

export default PreviewModal;
