"use client";
import { Form, Input, Checkbox, Modal, Radio, Button } from "antd";
import React, { useState } from "react";

export default function EditForm({
  open,
  onCancel,
  onOk,
  name,
  initialValues,
}) {
  const [form] = Form.useForm();
  const [isRequired, setIsRequired] = useState(false);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState("");
  const [fieldType, setFieldType] = useState(initialValues?.type ?? "text");

  const handleCheckboxChange = (e) => {
    setIsRequired(e.target.checked);
  };

  const handleAddOption = () => {
    if (newOption?.trim() !== "") {
      setOptions([...options, { _id: newOption?.trim(), name: newOption?.trim() }]);
      setNewOption(null);
    }
  };

  const onOkButtonClicked = () => {
    form
      .validateFields()
      .then(async (values) => {
        console.log(values);
        values.type = fieldType;
        values.isEditable = true;
        if (fieldType === "select" || fieldType === "radio") {
          values.data = options;
        }
        onOk(values);
        form.resetFields();
        setIsRequired(false);
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
        okButtonProps={{ style: { backgroundColor: "#334455" } }}
      >
        <span>Field Type</span>
        <Radio.Group
          onChange={(e) => setFieldType(e.target.value)}
          value={fieldType}
        >
          <Radio value="text">Text Field</Radio>
          <Radio value="radio">Radio Field</Radio>
          <Radio value="date">Date Picker</Radio>
          <Radio value="select">Select Field</Radio>
          <Radio value="image">Uplaod Image Field</Radio>
        </Radio.Group>
        <div className="mt-2">
          <Form form={form} layout="vertical" initialValues={initialValues}>
            <Form.Item
              name="name"
              label={<span>Name of the field (label)</span>}
              rules={[{ required: true, message: "Field name is required!" }]}
            >
              <Input className="rounded-md" />
            </Form.Item>
            <Form.Item
              name="isRequired"
              label={<span>Is it required</span>}
              valuePropName="checked"
            >
              <Checkbox onChange={handleCheckboxChange} defaultChecked={false}>
                Required
              </Checkbox>
            </Form.Item>
            <Form.Item
              name="errorMessage"
              label={<span>Error Message</span>}
              rules={[
                {
                  required: isRequired,
                  message: "Error message is required if Required is checked!",
                },
              ]}
            >
              <Input className="rounded-md" disabled={!isRequired} />
            </Form.Item>
            {fieldType === "select" || fieldType === "radio" ? (
              <div>
                <div>
                  <Input
                    className="rounded-md"
                    placeholder="Enter new option"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                  />
                  <div>
                    <Button
                      className="flex bg-cyan-200 rounded-md mt-2 px-4 mx-auto"
                      onClick={handleAddOption}
                    >
                      Add Option
                    </Button>
                  </div>
                  <ul className="disk">
                    {options?.map((option, index) => (
                      <li key={index}>{option?._id}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </Form>
        </div>
      </Modal>
    </>
  );
}
