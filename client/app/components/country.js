import State from "./state";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import Search from "./svg/search";
import NormalPlus from "./svg/NormalPlus";
import "./style.css";
const Country = ({ countries, refetch }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const filteredCountries = countries?.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then(async (values) => {
        form.resetFields();
        await addCountry(values);
        await refetch();
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

  const addCountry = async (values) => {
    try {
      const response = await axios.post("/dynamicform/add-country", {
        name: values.name,
      });

      filteredCountries.push(response.data?.data);

      console.log("Response:", response.data);
      // Handle the response as needed
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      // Handle errors as needed
    }
  };

  return (
    <>
      <div className=" px-4 py-2 mt-2 items-center text-white  flex justify-end">
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
          <table id="countries" className="table-auto bg-[#F04D99] rounded-lg ">
            <thead>
              <tr>
                <th className=" px-4 py-2 mb-2 border-b items-left text-white">
                  Countries
                </th>
              </tr>
            </thead>
            <tbody className="countries-tb overflow-y-scroll ">
              {filteredCountries?.map((country, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => handleCountryClick(country)}
                    className={` ${
                      country?._id === selectedCountry?._id
                        ? "bg-[#bd7ee5]"
                        : ""
                    }`}
                  >
                    <td className=" px-4 py-2 border-b text-white">
                      {country?.name}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div
            className=" px-4 py-2 mt-2 items-center bg-white rounded-lg text-black"
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
            refetch={refetch}
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
      </div>
    </>
  );
};

export default Country;
