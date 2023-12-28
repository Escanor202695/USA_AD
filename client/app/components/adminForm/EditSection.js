"use client";
import { Form, Input, Checkbox, Modal, Radio, Button } from "antd";
import React, { useState } from "react";

export default function EditSection({
  open,
  onCancel,
  onOk,
  name,
  initialValues,
}) {
  const [form] = Form.useForm();

  const onOkButtonClicked = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        onOk(values);
        form.resetFields();

      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <>
      <Modal
        title={`${name}`}
        open={open}
        onCancel={onCancel}
        onOk={onOkButtonClicked}
        okText="Save"
        okButtonProps={{ style: { backgroundColor: "#F04D99" } }}
      >
        <div className="mt-2">
          <Form form={form} layout="vertical" initialValues={initialValues}>
            <Form.Item
              name="name"
              label={<span>Name of the section</span>}
              rules={[{ required: true, message: "Field name is required!" }]}
            >
              <Input className="rounded-md" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
