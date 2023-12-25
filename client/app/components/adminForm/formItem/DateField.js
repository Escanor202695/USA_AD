import React from "react";
import { Form, Input, DatePicker } from "antd";
import moment from "moment";

const DateField = ({ name, rules }) => {
  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
      
    >
      <DatePicker
        format="DD/MM/YYYY"
        allowClear={false}
        className="rounded-lg"
      />
    </Form.Item>
  );
};

export default DateField;
