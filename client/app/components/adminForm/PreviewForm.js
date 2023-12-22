import React from 'react';
import { Modal, Form, Input, Checkbox, Radio, Button } from 'antd';
import ClientForm from './ClientForm';

const PreviewModal = ({ open, onCancel, formValues }) => {
  return (
    <Modal
      title="Preview Form"
      open={open}
      onCancel={onCancel}
      footer={null} // Remove the default footer
    >
      <ClientForm preview={true} formValues={formValues} />
    </Modal>
  );
};

export default PreviewModal;
