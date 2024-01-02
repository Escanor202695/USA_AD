"use client";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "antd";
import axios from "../../../utils/axios";
import SelectField from "./formItem/SelectField";
import TextField from "./formItem/TextField";
import DateField from "./formItem/DateField";
import ImageField from "./formItem/ImageField";
import RadioField from "./formItem/RadioField";
import CustomPhoneInput from "./formItem/PhoneInput";
import PreviewModal from "./PreviewForm";
import EditForm from "./EditForm";
import EditSection from "./EditSection";
import NormalPlus from "../svg/NormalPlus";
import DeleteIcon from "../svg/delete";

const AdminForm = ({ onFormSubmit }) => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [editFieldModalVisible, setEditFieldModalVisible] = useState(false);
  const [editSectionModalVisible, setEditSectionModalVisible] = useState(false);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [editedField, setEditedField] = useState(null);

  const fetchData = async () => {
    const response = await axios.get("/dynamicform/country-state-city");
    const data = response.data?.countries;
    // console.log(data);
    setCountries(data);
  };

  const fetchFormFields = async () => {
    const response = await axios.get("/dynamicform/form/v1");
    const data = response.data?.data;
    if (data) {
      setFormFields(data);
    }
  };

  useEffect(() => {
    fetchData();
    fetchFormFields();
  }, []);

  const [form] = Form.useForm();
  const [formFields, setFormFields] = useState([
    {
      section: "Contact Info",
      fields: [
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
          isEditable: false,
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
      ],
    },
    {
      section: "Ad info",
      fields: [
        {
          name: "Title",
          type: "text",
          isRequired: true,
          errorMessage: "Please add the title",
          isEditable: false,
        },
        {
          name: "Details",
          type: "text",
          isRequired: true,
          errorMessage: "Please add the title",
          isEditable: false,
        },
        {
          name: "Disclaimer",
          type: "text",
          isRequired: true,
          errorMessage: "Please add the title",
          isEditable: false,
        },
        {
          name: "Listing Category",
          type: "select",
          isRequired: true,
          errorMessage: "Please add the title",
          isEditable: false,
          data: [
            { _id: "1", name: "Premium" },
            { _id: "2", name: "Standard" },
          ],
        },
        {
          name: "Upload images",
          type: "image",
          isRequired: true,
          errorMessage: "Please add the title",
          isEditable: false,
        },
      ],
    },
  ]);

  const handleFormSubmit = () => {
    form.validateFields().then((values) => {
      onFormSubmit(values);
    });
  };

  const handleEditFieldClick = (e) => {
    e.preventDefault();
    setEditFieldModalVisible(true);
  };

  const handleEditFieldModalCancel = () => {
    setEditFieldModalVisible(false);
    setEditedField(null);
  };

  const handleEditFieldModalOk = (sectionIdx, values) => {
    console.log(sectionIdx, values);
    // setFormFields((prevFields) => [...prevFields, values]);
    const newFormFields = [...formFields];
    newFormFields[sectionIdx].fields.push(values);
    setFormFields(newFormFields);

    setEditedField(null);
    setEditFieldModalVisible(false);
  };

  const confirmDeleteField = (sectionIndex, fieldIndex) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this field?",
      okText: "Delete",
      onOk: () => deleteField(sectionIndex, fieldIndex),
      okButtonProps: { style: { background: "red", borderColor: "red" } },
    });
  };

  const deleteField = (sectionIndex, fieldIndex) => {
    const newFormFields = [...formFields];
    newFormFields[sectionIndex].fields.splice(fieldIndex, 1);
    setFormFields(newFormFields);
  };

  const handleEditSectionClick = (e) => {
    e.preventDefault();
    setEditSectionModalVisible(true);
  };

  const handleEditSectionModalCancel = () => {
    setEditSectionModalVisible(false);
    // setEditedField(null);
  };

  const handleEditSectionModalOk = (values) => {
    console.log(values);
    setFormFields([...formFields, { section: values.name, fields: [] }]);
    // setFormFields((prevFields) => [...prevFields, values]);
    // setEditedField(null);
    setEditSectionModalVisible(false);
  };

  const confirmDeleteSection = (sectionIndex) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this section?",
      okText: "Delete",
      onOk: () => deleteSection(sectionIndex),
      okButtonProps: { style: { background: "red", borderColor: "red" } },
    });
  };

  const deleteSection = (sectionIndex) => {
    const newFormFields = [...formFields];
    newFormFields.splice(sectionIndex, 1);
    setFormFields(newFormFields);
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
    setEditedField(formField);
    setEditFieldModalVisible(true);
  };

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <div>
        <EditSection
          open={editSectionModalVisible}
          onCancel={handleEditSectionModalCancel}
          onOk={handleEditSectionModalOk}
          name={"Modify Section"}
          initialValues={editedField}
        />
        <button
          onClick={handleEditSectionClick}
          className="flex bg-[#F04D99] items-center text-white rounded-md py-2 px-4 mx-auto"
        >
          Add new Section
          <NormalPlus />
        </button>
      </div>
      <div>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          {formFields?.map((section, sectionIndex) => {
            return (
              <div key={sectionIndex} className="border-2 p-3 my-2">
                <div className="flex justify-between items-center">
                  <div className="text-white text-lg font-semibold">
                    Section: {section?.section}
                  </div>
                  <div className="flex">
                    <button
                      onClick={handleEditFieldClick}
                      className="flex bg-[#F04D99] items-center text-white rounded-md py-2 px-4 my-2"
                    >
                      Add new field
                      <NormalPlus />
                    </button>
                    {sectionIndex != 0 && (
                      <button
                        disabled={sectionIndex == 0}
                        onClick={(e) => {
                          e.preventDefault();
                          confirmDeleteSection(sectionIndex);
                        }}
                        className="flex bg-[#F04D99] items-center text-white rounded-md py-2 px-4 m-2"
                      >
                        Delete the section
                        <DeleteIcon />
                      </button>
                    )}
                  </div>
                </div>

                <EditForm
                  open={editFieldModalVisible}
                  onCancel={handleEditFieldModalCancel}
                  onOk={handleEditFieldModalOk}
                  name={"Modify Field"}
                  initialValues={editedField}
                  sectionName={section?.section}
                  sectionIndex={sectionIndex}
                />

                {section?.fields?.map((field, index) => {
                  if (field?.type === "text")
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center "
                      >
                        <div className=" flex-1 ">
                          <TextField
                            name={field?.name}
                            rules={[
                              {
                                required: field?.isRequired,
                                message:
                                  field?.errorMessage ?? "Please enter a value",
                              },
                            ]}
                          />
                        </div>
                        {field?.isEditable ? (
                          <div className="">
                            <div className=" pt-2 ml-2">
                              <button
                                className="p-2 mr-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onFormFieldEdit(field);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="p-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  confirmDeleteField(sectionIndex, index);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  if (field?.type === "phone")
                    return (
                      <div className=" flex-1">
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
                      </div>
                    );
                  if (field?.type === "select")
                    return (
                      <div
                        key={index}
                        className=" flex justify-between items-center  "
                      >
                        <div className="flex-1">
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
                                  field?.errorMessage ??
                                  "Please select a value",
                              },
                            ]}
                          />
                        </div>
                        {field?.isEditable ? (
                          <div className="">
                            <div className=" pt-2 ml-2">
                              <button
                                className="p-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  confirmDeleteField(sectionIndex, index);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  if (field?.type === "date")
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center  "
                      >
                        <div className=" flex-1">
                          <DateField
                            name={field?.name}
                            rules={[
                              {
                                required: field?.isRequired,
                                message:
                                  field?.errorMessage ??
                                  "Please select a value",
                              },
                            ]}
                          />
                        </div>
                        {field?.isEditable ? (
                          <div className="">
                            <div className=" pt-2 ml-2">
                              <button
                                className="p-2 mr-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onFormFieldEdit(field);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="p-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  confirmDeleteField(sectionIndex, index);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  if (field?.type === "radio")
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center "
                      >
                        <div className="flex-1">
                          <RadioField
                            name={field?.name}
                            data={field?.data}
                            rules={[
                              {
                                required: field?.isRequired,
                                message:
                                  field?.errorMessage ??
                                  "Please select a value",
                              },
                            ]}
                          />
                        </div>
                        {field?.isEditable ? (
                          <div className="">
                            <div className=" pt-2 ml-2">
                              <button
                                className="p-2 mr-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onFormFieldEdit(field);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="p-2 bg-[#F04D99]  text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  confirmDeleteField(sectionIndex, index);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  if (field?.type === "image")
                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex-1">
                          <ImageField
                            name={field?.name}
                            rules={[
                              {
                                required: field?.isRequired,
                                message:
                                  field?.errorMessage ??
                                  "Please select a value",
                              },
                            ]}
                          />
                        </div>
                        {field?.isEditable ? (
                          <div className="">
                            <div className=" pt-2 ml-2">
                              <button
                                className="p-2 mr-2 bg-[#F04D99] text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onFormFieldEdit(field);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="p-2 bg-[#F04D99]  text-white rounded-md"
                                onClick={(e) => {
                                  e.preventDefault();
                                  confirmDeleteField(sectionIndex, index);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                })}
              </div>
            );
          })}
          <Form.Item>
            <div className="">
              <button
                className="flex bg-[#F04D99] text-white rounded-md py-2 px-4 mx-auto"
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
