import React from "react";
import { Form, Input, DatePicker, Space } from "antd";
import moment from "moment";

const DateField = ({ name, rules }) => {
  const [formItemValue, setFormItemValue] = React.useState(null);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
    setFormItemValue(dateString);
  };
  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
      value={formItemValue}
    >
      <DatePicker
        format="DD/MM/YYYY"
        allowClear={true}
        size="large"
        onChange={onChange}
        className="rounded-lg"
        style={{
          width: "100%",
        }}
      />
    </Form.Item>
  );
};

export default DateField;
