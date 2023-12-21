import State from "./state";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";

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
    <div className="container mx-auto flex flex-wrap py-6 overflow-hidden">
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table id="countries" className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 mb-2 items-left">
                Countries
                <div className="border px-4 py-2 mt-2 items-center">
                  <button onClick={showModal}>Add Country</button>
                </div>
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2">
                <input
                  id="search-countries"
                  type="search"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Search Countries.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody className="countries-tb overflow-y-scroll">
            {filteredCountries?.map((country, index) => {
              return (
                <tr key={index} onClick={() => handleCountryClick(country)} className={`${country?._id === selectedCountry?._id ? "bg-red-700" : ''}`}>
                  <td className="border px-4 py-2">{country?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
  );
};

export default Country;
