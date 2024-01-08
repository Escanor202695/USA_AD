import State from "./state";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import Search from "./svg/search";
import NormalPlus from "./svg/NormalPlus";
import "./style.css";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Country = ({ countries, fetch }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSelectedCountry, setEditSelectedCountry] = useState(null);
  const [form] = Form.useForm();
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [countryUpdateFlag, setCountryUpdateFlag] = useState(false);
  const [updatedCountries, setUpdatedCountries] = useState(countries);
  const [newSelectedCountry,setNewSelectedCountry] = useState(null);

  const handleCountryClick = async (country) => {
    setSelectedCountry(country);
    setCountryUpdateFlag(true);

  };

  useEffect(() => {
    const filtered =
      countries?.filter((country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
    setFilteredCountries(filtered);
  }, [countries]);

  useEffect(() => {
    if (selectedCountry) {
    } else if (filteredCountries && filteredCountries.length > 0) {
      setSelectedCountry(filteredCountries[0]);
      setNewSelectedCountry(filteredCountries[0]);
    }
  }, [filteredCountries]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        await addCountry(values);
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
        `/dynamicform/country/${editSelectedCountry?._id}`,
        {
          name: country.name,
        }
      );
      const index = filteredCountries.findIndex(
        (country) => country._id === editSelectedCountry?._id
      );

      if (index !== -1) {
        // Replace the country at the found index with the edited country
        setFilteredCountries((prevCountries) => {
          const newCountries = [...prevCountries];
          newCountries[index] = response.data?.data;
          return newCountries;
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
      content: "Are you sure you want to delete this country?",
      okText: "Delete",
      okButtonProps: { style: { background: "red", borderColor: "red" } },
      onOk: async () => {
        try {
          const response = await axios.delete(
            `/dynamicform/country/${country?._id}`
          );
          setFilteredCountries((prevCountries) =>
            prevCountries.filter((c) => c._id !== country._id)
          );
          setSelectedCountry(null);
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

  const addCountry = async (values) => {
    try {
      const response = await axios.post("/dynamicform/add-country", {
        name: values.name,
      });

      setFilteredCountries([...filteredCountries, response.data?.data]);

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
      <div className=" px-4 py-2 mt-2 items-center text-white hidden  lg:flex justify-end ">
        <button className="  flex items-center font-semibold justify-between rounded-lg">
          <input
            id="search-countries"
            type="search"
            className=" appearance-none bg-[#F04D99] rounded w-[90%]   !text-white leading-tight"
            placeholder="Search Countries.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </button>
      </div>

      <div className="container mx-auto flex flex-wrap py-6 overflow-hidden ">
        <section className="w-full md:w-1/3 flex flex-col px-3">
          <table
            id="countries"
            className="table-auto bg-white rounded-lg overflow-hidden"
          >
            <thead>
              <tr>
                <th className=" px-4 py-2 bg-[#F04D99] items-left text-white">
                  Countries
                </th>
              </tr>
            </thead>
            <tbody className="countries-tb overflow-y-scroll ">
              {filteredCountries?.map((country, index) => {
                return (
                  <tr
                    key={index}
                    className={` ${
                      country?._id === selectedCountry?._id
                        ? "bg-[#bd7ee5] text-white"
                        : "text-black"
                    }`}
                  >
                    <td
                      onClick={() => handleCountryClick(country)}
                      className=" flex justify-between px-4 py-2 border-b cursor-pointer"
                    >
                      {country?.name}
                      <div className="flex">
                        <div
                          onClick={() => {
                            setEditSelectedCountry(country);
                            showEditModal();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            className=" text-gray-600 w-3 h-3 cursor-pointer mr-2"
                          />
                        </div>
                        <div onClick={() => handleDelete(country)}>
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
              Add Country <NormalPlus />
            </button>
          </div>
        </section>

        {selectedCountry && (
          <State
            states={selectedCountry.states}
            countryId={selectedCountry?._id}
            countryName={selectedCountry?.name}
            setCountryUpdateFlag={setCountryUpdateFlag}
            countryUpdateFlag={countryUpdateFlag}
            fetch={fetch}
          />
        )}

        <Modal
          title="Add Country"
          open={isModalOpen}
          onCancel={handleCancel}
          okButtonProps={{ style: { backgroundColor: "#334455" } }}
          onOk={handleOk}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              name="name"
              label="Country Name"
              rules={[
                { required: true, message: "Please input the country name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="Edit Country"
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
              label="Country Name"
              rules={[
                { required: true, message: "Please input the country name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Country;
