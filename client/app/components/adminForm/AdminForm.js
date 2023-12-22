"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, DatePicker } from "antd";
import axios from "../../../utils/axios";
import AddFieldModal from "./AddFieldModal";
import SelectField from "./formItem/SelectField";
import TextField from "./formItem/TextField";
import DateField from "./formItem/DateField";
import ImageField from "./formItem/ImageField";
import RadioField from "./formItem/RadioField";
import CustomPhoneInput from "./formItem/PhoneInput";
import PreviewModal from "./PreviewForm";
import EditForm from "./EditForm";

const { Option } = Select;

const AdminForm = ({ onFormSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editFieldModalVisible, setEditFieldModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [editedField, setEditedField] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("/dynamicform/country-state-city");
    const data = response.data?.countries;
    // console.log(data);
    setCountries(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState([
    {
      name: "Phone",
      type: "phone",
      isRequired: true,
      errorMessage: "Please enter a valid phone number",
      isEditable: false,
    },
    {
      name: "Email",
      type: "text",
      isRequired: true,
      errorMessage: "Please enter a valid email address",
      isEditable: true,
    },
    {
      name: "Country",
      type: "select",
      isRequired: true,
      errorMessage: "Please select a country",
      isEditable: false,
    },
    {
      name: "State",
      type: "select",
      isRequired: true,
      errorMessage: "Please select a State",
      isEditable: false,
    },
    {
      name: "City",
      type: "select",
      isRequired: true,
      errorMessage: "Please select a City",
      isEditable: false,
    },
    {
      name: "Location",
      type: "text",
      isRequired: true,
      errorMessage: "Please enter your loaction",
      isEditable: false,
    },
  ]);

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      onFormSubmit(values);
    });
  };

  const handleEditFieldClick = () => {
    setEditFieldModalVisible(true);
  };

  const handleEditFieldModalCancel = () => {
    setEditFieldModalVisible(false);
    setEditedField(null);
  };

  const handleEditFieldModalOk = (values) => {
    console.log(values);
    setFormFields((prevFields) => [...prevFields, values]);
    setEditedField(null);
    setEditFieldModalVisible(false);
  };

  const handleCountryChange = (value) => {
    const selectedCountry = countries.find((country) => country._id === value);

    if (selectedCountry) {
      setStates(selectedCountry.states || []);
      form.setFieldsValue({ State: undefined, City: undefined });
    } else {
      setStates([]);
    }
  };

  const handleStateChange = (value) => {
    const selectedState = states.find((state) => state._id === value);

    if (selectedState) {
      setCities(selectedState.cities || []);
      form.setFieldsValue({ City: undefined });
    } else {
      setCities([]);
    }
  };

  const onFormFieldEdit = (formField) => {
    handleEditFieldClick();
  };

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <div>
        <EditForm
          open={editFieldModalVisible}
          onCancel={handleEditFieldModalCancel}
          onOk={handleEditFieldModalOk}
          name={"Modify Field"}
          initialValues={editedField}
        />
        <button
          onClick={handleEditFieldClick}
          className="flex bg-cyan-200 rounded-md py-2 px-4 mx-auto"
        >
          Add new field
        </button>
      </div>
      <div>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          {formFields?.map((field, index) => {
            if (field?.type === "text")
              return (
                <div key={index} className="flex justify-around">
                  <TextField
                    name={field?.name}
                    rules={[
                      {
                        required: field?.isRequired,
                        message: field?.errorMessage ?? "Please enter a value",
                      },
                    ]}
                  />
                  {field?.isEditable ? (
                    <div className="mt-8">
                      <button
                        className="p-2 bg-[#343434] text-white rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          onFormFieldEdit(field);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
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
                <div key={index} className="flex justify-around">
                  <DateField
                    name={field?.name}
                    rules={[
                      {
                        required: field?.isRequired,
                        message: field?.errorMessage ?? "Please select a value",
                      },
                    ]}
                  />
                  {field?.isEditable ? (
                    <div className="mt-8">
                      <button
                        className="p-2 bg-[#343434] text-white rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          onFormFieldEdit(field);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            if (field?.type === "radio")
              return (
                <div key={index} className="flex justify-around">
                  <RadioField
                    name={field?.name}
                    data={field?.data}
                    rules={[
                      {
                        required: field?.isRequired,
                        message: field?.errorMessage ?? "Please select a value",
                      },
                    ]}
                  />
                  {field?.isEditable ? (
                    <div className="mt-8">
                      <button
                        className="p-2 bg-[#343434] text-white rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          onFormFieldEdit(field);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              );
            if (field?.type === "image")
              return (
                <div key={index} className="flex justify-around">
                  <ImageField
                    name={field?.name}
                    rules={[
                      {
                        required: field?.isRequired,
                        message: field?.errorMessage ?? "Please select a value",
                      },
                    ]}
                  />
                  {field?.isEditable ? (
                    <div className="mt-8">
                      <button
                        className="p-2 bg-[#343434] text-white rounded-md"
                        onClick={(e) => {
                          e.preventDefault();
                          setEditedField(field);
                          onFormFieldEdit(field);
                        }}
                      >
                        Edit
                      </button>
                    </div>
                  ) : null}
                </div>
              );
          })}

          <Form.Item>
            <div className="">
              <button
                className="flex bg-cyan-200 rounded-md py-2 px-4 mx-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setPreviewModalVisible(true);
                }}
              >
                Preview
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
      <PreviewModal
        open={previewModalVisible}
        onCancel={() => setPreviewModalVisible(false)}
        formValues={formFields}
      />
    </div>
  );
};

export default AdminForm;
