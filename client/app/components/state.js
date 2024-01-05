import City from "./city";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import NormalPlus from "./svg/NormalPlus";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const State = ({
  states,
  countryId,
  countryName,
  countryUpdateFlag,
  setCountryUpdateFlag,
}) => {
  const [selectedState, setSelectedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSelectedCountry, setEditSelectedCountry] = useState(null);
  const [filteredStates, setFilteredStates] = useState(states);

  useEffect(() => {
    if (countryUpdateFlag) setCountryUpdateFlag(false);
    setSelectedState(null);
  }, [countryUpdateFlag]);

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  useEffect(() => {
    const filtered = states?.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStates(filtered);
  }, [states]);

  useEffect(() => {
    if (selectedState) {
    } else if (filteredStates && filteredStates.length > 0) {
      setSelectedState(filteredStates[0]);
    }
  }, [filteredStates]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();

        await addState(values);
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    // setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const showEditModal = () => {
    setIsEditModalOpen(true);
  };
  const handleEditOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        await handleEdit(values);
        setIsEditModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  const handleEdit = async (country) => {
    try {
      const response = await axios.patch(
        `/dynamicform/states/${editSelectedCountry?._id}`,
        {
          name: country.name,
        }
      );
      const index = filteredStates.findIndex(
        (state) => state._id === editSelectedCountry?._id
      );

      if (index !== -1) {
        setFilteredStates((prevStates) => {
          const newStates = [...prevStates];
          newStates[index] = response.data?.data;
          return newStates;
        });
      }
      console.log("Response:", response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleDelete = async (country) => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete this state?",
      okText: "Delete",
      okButtonProps: { style: { background: "red", borderColor: "red" } },
      onOk: async () => {
        try {
          const response = await axios.delete(
            `/dynamicform/states/${country?._id}`
          );
          setFilteredStates((prevStates) =>
            prevStates.filter((c) => c._id !== country._id)
          );
          setSelectedState(null);
          console.log("Response:", response.data);
        } catch (error) {
          toast.error(error?.response?.data?.message);
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        }
      },
    });
  };

  const addState = async (values) => {
    try {
      const response = await axios.post(`/dynamicform/add-state/${countryId}`, {
        name: values.name,
      });

      setFilteredStates([...filteredStates, response.data?.data]);

      // Handle the response as needed
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle errors as needed
    }
  };

  return (
    <>
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table
          id="countries"
          className="table-auto rounded-lg bg-white overflow-hidden"
        >
          <thead>
            <tr>
              <th className=" px-4 py-2 bg-[#F04D99] text-white items-left">
                States
              </th>
            </tr>
          </thead>
          <tbody className="countries-tb overflow-y-scroll">
            {filteredStates?.map((state, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    state?._id === selectedState?._id
                      ? "bg-[#bd7ee5] text-white"
                      : "text-black"
                  } `}
                >
                  <td
                    onClick={() => handleStateClick(state)}
                    className=" flex justify-between px-4 py-2 border-b cursor-pointer"
                  >
                    {state?.name}
                    <div className="flex">
                      <div
                        onClick={() => {
                          setEditSelectedCountry(state);
                          showEditModal();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-gray-600 w-3 h-3 cursor-pointer mr-2"
                        />
                      </div>
                      <div onClick={() => handleDelete(state)}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-gray-600 w-3 h-3 cursor-pointer"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div
          className=" my-2 items-center  rounded-lg text-white"
          onClick={showModal}
        >
          <button className=" flex items-center rounded-lg">
            Add State <NormalPlus />
          </button>
        </div>
      </section>

      {selectedState && (
        <City
          cities={selectedState?.cities}
          stateId={selectedState?._id}
          stateName={selectedState?.name}
          setCountryUpdateFlag={setCountryUpdateFlag}
          countryUpdateFlag={countryUpdateFlag}
        />
      )}
      <Modal
        title={`Add State into ${countryName}`}
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#334455" } }}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="State Name"
            rules={[
              { required: true, message: "Please input the state name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit State"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        okButtonProps={{ style: { backgroundColor: "#334455" } }}
        onOk={handleEditOk}
      >
        <Form
          form={form}
          initialValues={{ name: editSelectedCountry?.name }}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="State Name"
            rules={[
              { required: true, message: "Please input the state name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default State;
