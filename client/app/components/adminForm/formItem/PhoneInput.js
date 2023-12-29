"use client";

import { validatePhoneNumber } from "../../../../utils/validPhone";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Form } from "antd";

function CustomPhoneInput({ onChange, name, rules }) {
  const [value, setValue] = useState("");

  const handleChange = (inputValue, country) => {
    setValue(`+${inputValue.toString()}`);
    if (onChange) {
      onChange(`+${inputValue.toString()}`);
    }
  };

  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
    >
      <PhoneInput
        inputStyle={{ width: "100%", height: "45px" }}
        placeholder="Enter phone number"
        enableSearch={true}
        country={"us"}
        autoFormat
        countryCodeEditable={false}
        disableSearchIcon
        value={value}
        onChange={handleChange}
        isValid={(inputValue) => {
          if (inputValue.length > 3) {
            return validatePhoneNumber(`+${inputValue}`);
          }
          return true;
        }}
      />
    </Form.Item>
  );
}

export default CustomPhoneInput;
