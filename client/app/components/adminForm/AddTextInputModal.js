'use client';
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const AddTextInputModal = ({ visible, onCancel, onFieldAdd }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((values) => {
      onFieldAdd('text', values);
      form.resetFields();
      onCancel();
    });
  };

  return (
    <Modal
      title="Add Text Input"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okButtonProps={{ style: { backgroundColor: '343434' } }}
    >
      <Form form={form} layout="vertical">
        <Form.Item label="Field Name" name="fieldName" rules={[{ required: true, message: 'Please enter the field name' }]}>
          <Input placeholder="Enter Field Name" />
        </Form.Item>
        <Form.Item label="Label" name="label" rules={[{ required: true, message: 'Please enter the label' }]}>
          <Input placeholder="Enter Label" />
        </Form.Item>
        {/* Add more fields as needed */}
      </Form>
      <div style={{ marginTop: '16px' }}>
        <Button type="primary" onClick={handleOk}>
          Add Text Input
        </Button>
      </div>
    </Modal>
  );
};

export default AddTextInputModal;
