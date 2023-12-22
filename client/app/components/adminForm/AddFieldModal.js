'use client';
import React, { useState } from 'react';
import { Modal, Radio, Button } from 'antd';

const AddFieldModal = ({ visible, onCancel, onFieldAdd }) => {
  const [fieldType, setFieldType] = useState('text');

  const handleOk = () => {
    onFieldAdd(fieldType);
    onCancel();
  };

  return (
    <Modal
      title="Add Field"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ color: 'blue' }}
    >
      <p>Select the type of field you want to add:</p>
      <Radio.Group onChange={(e) => setFieldType(e.target.value)} value={fieldType}>
        <Radio value="text">Text Field</Radio>
        <Radio value="radio">Radio Field</Radio>
        <Radio value="date">Date Picker</Radio>
        <Radio value="select">Select Field</Radio>
      </Radio.Group>
      <div style={{ marginTop: '16px' }}>
        <Button type="primary" onClick={handleOk}>
          Add Field
        </Button>
      </div>
    </Modal>
  );
};

export default AddFieldModal;
