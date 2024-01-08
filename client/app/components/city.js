import { useState, useEffect } from "react";
import { Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import NormalPlus from "./svg/NormalPlus";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const City = ({
  cities,
  stateId,
  stateName,
  countryUpdateFlag,
  setCountryUpdateFlag,
  fetch
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSelectedCountry, setEditSelectedCountry] = useState(null);
  const [filteredCities, setFilteredCities] = useState(cities);

  useEffect(() => {
    const filtered =
      cities?.filter((state) =>
        state.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    setFilteredCities(filtered);
  }, [cities]);

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        console.log(values);
        await addCity(values);
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
        `/dynamicform/cities/${editSelectedCountry?._id}`,
        {
          name: country.name,
        }
      );

      const index = filteredCities.findIndex(
        (state) => state._id === editSelectedCountry?._id
      );

      if (index !== -1) {
        setFilteredCities((prevStates) => {
          const newCities = [...prevCities];
          newCities[index] = response.data?.data;
          return newCities;
        });
      }
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
      content: "Are you sure you want to delete this city?",
      okText: "Delete",
      okButtonProps: { style: { background: "red", borderColor: "red" } },
      onOk: async () => {
        try {
          const response = await axios.delete(
            `/dynamicform/cities/${country?._id}`
          );
          setFilteredCities((prevCities) =>
            prevCities.filter((c) => c._id !== country._id)
          );
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

  const addCity = async (values) => {
    try {
      const response = await axios.post(`/dynamicform/add-city/${stateId}`, {
        name: values.name,
      });

      setFilteredCities([...filteredCities, response.data?.data]);
      fetch();

      console.log("Response:", response.data);
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
          id="cities"
          className="table-auto bg-white rounded-lg overflow-hidden "
        >
          <thead>
            <tr>
              <th className=" px-4 py-2 items-left bg-[#F04D99]  text-white">
                Cities
              </th>
            </tr>
          </thead>
          <tbody className="countries-tb overflow-y-scroll">
            {filteredCities?.map((city, index) => {
              return (
                <tr
                  key={index}
                  className={`${
                    city?._id === selectedCity?._id
                      ? "bg-[#bd7ee5] text-white"
                      : "text-black"
                  }`}
                >
                  <td
                    onClick={() => handleCityClick(city)}
                    className="flex justify-between border-b px-4 py-2  cursor-pointer"
                  >
                    {city?.name}
                    <div className="flex">
                      <div
                        onClick={() => {
                          setEditSelectedCountry(city);
                          showEditModal();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="text-gray-600 w-3 h-3 cursor-pointer mr-2"
                        />
                      </div>
                      <div onClick={() => handleDelete(city)}>
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
        <div className=" my-2 items-center  rounded-lg text-white">
          <button onClick={showModal} className=" flex items-center rounded-lg">
            Add City <NormalPlus />
          </button>
        </div>
      </section>
      <Modal
        title={`Add State into ${stateName}`}
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{ style: { backgroundColor: "#334455" } }}
        onOk={handleOk}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="City Name"
            rules={[{ required: true, message: "Please input the city name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit City"
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
            label="City Name"
            rules={[{ required: true, message: "Please input the city name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default City;
