import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Form } from "antd";

import TextField from "./formItem/TextField";
import CustomPhoneInput from "./formItem/PhoneInput";
import SelectField from "./formItem/SelectField";
import DateField from "./formItem/DateField";
import RadioField from "./formItem/RadioField";
import ImageField from "./formItem/ImageField";

const ClientForm = ({ preview, formValues }) => {
  const [form] = Form.useForm();

  const [allValide, setAllValide] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("/dynamicform/country-state-city");
    const data = response.data?.countries;
    // console.log(data);
    setCountries(data);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleCountryChange = (value) => {
    const selectedCountry = countries.find((country) => country.name === value);

    if (selectedCountry) {
      setStates(selectedCountry.states || []);
      form.setFieldsValue({ State: undefined, City: undefined });
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (value) => {
    const selectedState = states.find((state) => state.name === value);

    if (selectedState) {
      setCities(selectedState.cities || []);
      form.setFieldsValue({ City: undefined });
    } else {
      setCities([]);
    }
  };

  const handleFormSubmit = async (values) => {
    const res = await axios.post('/dynamicform/formdata', { data: values })
    console.log(res.data);
    form.resetFields();
  };

  return (
    <div className="pt-[50px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <Form form={form} onFinishFailed={() => { setAllValide(false) }} onFinish={handleFormSubmit} layout="vertical">
        {formValues?.map((field, index) => {
          if (field?.type === "text")
            return (
              <TextField
                key={index}
                name={field?.name}
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please enter a value",
                  },
                ]}
              />
            );
          if (field?.type === "phone")
            return (
              <CustomPhoneInput
                key={index}
                name={field?.name}
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please enter a value",
                  },
                ]}
              />
            );
          if (field?.type === "select")
            return (
              <SelectField
                key={index}
                name={field?.name}
                data={
                  field?.name === "Country"
                    ? countries
                    : field?.name === "State"
                      ? states
                      : field?.name === "City"
                        ? cities
                        : field?.data
                }
                onChange={
                  field?.name === "Country"
                    ? handleCountryChange
                    : field?.name === "State"
                      ? handleStateChange
                      : null
                }
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please select a value",
                  },
                ]}
              />
            );
          if (field?.type === "date")
            return (
              <DateField
                key={index}
                name={field?.name}
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please select a value",
                  },
                ]}
              />
            );
          if (field?.type === "radio")
            return (
              <RadioField
                key={index}
                name={field?.name}
                data={field?.data}
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please select a value",
                  },
                ]}
              />
            );
          if (field?.type === "image")
            return (
              <ImageField
                key={index}
                name={field?.name}
                rules={[
                  {
                    required: field?.isRequired,
                    message: field?.errorMessage ?? "Please select a value",
                  },
                ]}
              />
            );
        })}

        <Form.Item>
          <button
            className="flex bg-cyan-200 rounded-md py-2 px-4 mx-auto"
          >
            Submit
          </button>

        </Form.Item>
      </Form>

      {
        preview && !allValide ? (<div>All * fieldes have to be correct to submit a form</div>) : null
      }
    </div>
  );
};

export default ClientForm;
