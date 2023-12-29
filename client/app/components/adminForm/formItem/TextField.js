import React from "react";
import { Form, Input } from "antd";

const TextField = ({ name, rules }) => {
  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
    >
      <Input className="rounded-lg" />
    </Form.Item>
  );
};

export default TextField;
