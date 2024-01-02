import React, { useState } from "react";
import { Form, Select, Radio } from "antd";

const { Option } = Select;

const RadioField = ({ name, data, rules }) => {
  const [fieldType, setFieldType] = useState(null);

  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
    >
      <Radio.Group
        onChange={(e) => setFieldType(e.target.value)}
        value={fieldType}
        className="bg-white  p-2 w-full rounded-lg flex-1 flex"
      >
        {data?.map((item) => (
          <Radio key={item._id} value={item._id} >
            {item.name}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};

export default RadioField;
