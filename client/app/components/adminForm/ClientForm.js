import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { Button, Form, Input, Select, Space } from "antd";
import TextField from "./formItem/TextField";
import CustomPhoneInput from "./formItem/PhoneInput";
import SelectField from "./formItem/SelectField";
import DateField from "./formItem/DateField";
import RadioField from "./formItem/RadioField";
import ImageField from "./formItem/ImageField";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Modal } from "antd"; // Import Ant Design Modal

const ClientForm = ({ preview, formValues }) => {
  const [form] = Form.useForm();

  const [allValide, setAllValide] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const router = useRouter();
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
    if (!localStorage.getItem("token")) {
      Modal.confirm({
        title: "You need to login first",
        content: "Are you a valid user?",
        okText: "Login",
        okButtonProps: { style: { background: "red", borderColor: "red" } },
        onOk: () => router.push("/login"), // Navigate to "/login" on OK
      });
      return;
    }
    const fileKey = Object.keys(values).find(
      (key) =>
        (Array.isArray(values[key]?.fileList) &&
          values[key]?.fileList[0]?.response) ||
        values[key]?.file?.response
    );

    if (fileKey) {
      // Check if it's a single file or a fileList
      if (
        Array.isArray(values[fileKey]?.fileList) &&
        values[fileKey]?.fileList[0]?.response
      ) {
        values[fileKey] = values[fileKey].fileList.map((file) => file.response);
      } else if (values[fileKey]?.file?.response) {
        values[fileKey] = [values[fileKey].file.response];
      }
    }

    console.log(values);

    const formData = {};

    formValues.forEach((section) => {
      formData[section.section] = {};

      section.fields.forEach((field) => {
        formData[section.section][field.name] = values[field.name];
      });
    });

    console.log(formData);

    const res = await axios.post("/dynamicform/formdata", {
      data: formData,
      email: localStorage.getItem("useremail"),
    });
    console.log(res.data);
    toast.success("Form submitted successfully");
    form.resetFields();
  };

  return (
    <div className="border bg-[#101827] rounded-lg border-[#F04D99] w-[100%]  mx-auto">
      <Form
        form={form}
        onFinishFailed={() => {
          setAllValide(false);
        }}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{
          color: "white",
          padding: "20px",
          margin: "auto",
          borderRadius: "10px", // camelCase for border-radius
        }}
      >
        {formValues?.map((section, sectionIndex) => {
          return (
            <div key={sectionIndex}>
              <div>{section?.section}</div>
              {section?.fields?.map((field, index) => {
                if (field?.type === "text")
                  return (
                    <TextField
                      key={index}
                      name={field?.name}
                      rules={[
                        {
                          required: field?.isRequired,
                          message:
                            field?.errorMessage ?? "Please enter a value",
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
                          message:
                            field?.errorMessage ?? "Please enter a value",
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
                          message:
                            field?.errorMessage ?? "Please select a value",
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
                          message:
                            field?.errorMessage ?? "Please select a value",
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
                          message:
                            field?.errorMessage ?? "Please select a value",
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
                          message:
                            field?.errorMessage ?? "Please select a value",
                        },
                      ]}
                    />
                  );
              })}
            </div>
          );
        })}

        <Form.Item>
          <button className="flex w-full justify-center rounded-md bg-[#F04D99]  px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-[#bd7ee5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Submit
          </button>
        </Form.Item>
      </Form>

      {preview && !allValide ? (
        <div>All * fieldes have to be correct to submit a form</div>
      ) : null}
    </div>
  );
};

export default ClientForm;
