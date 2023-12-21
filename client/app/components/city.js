import { useState } from "react";


import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";

const City = ({ cities, stateId, stateName, refetch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredStates = cities?.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



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

  const addCity = async (values) => {
    try {
      const response = await axios.post(`/dynamicform/add-city/${stateId}`, {
        name: values.name,
      });

      filteredStates.push(response.data?.data);

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
      <section className="w-full md:w-1/3 flex flex-col px-3">
        <table id="countries" className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2 items-left">
                Cities
                <div className="border px-4 py-2 mt-2 items-center">
                  <button onClick={showModal}>Add City</button>
                </div>
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2">
                <input
                  id="search-countries"
                  type="search"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Search Cities.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody className="countries-tb overflow-y-scroll">
            {filteredStates?.map((city, index) => {
              return (
                <tr key={index} onClick={() => { setSelectedCity(city) }} className={`${city?._id === selectedCity?._id ? "bg-red-700" : ''}`}>
                  <td className="border px-4 py-2">{city?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
            rules={[
              { required: true, message: "Please input the city name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default City;
