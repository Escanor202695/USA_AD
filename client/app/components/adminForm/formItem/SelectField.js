import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const SelectField = ({ name, data, onChange, rules }) => {
  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}

    >
      <Select size="large" onChange={onChange}>
        {data?.map((item) => (
          <Option key={item._id} value={item.name}>
            {item.name}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SelectField;
