import { useState } from "react";

import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import NormalPlus from "./svg/NormalPlus";
import { toast } from "react-toastify";

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
      toast.error(error?.response?.data?.message)
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
            {filteredStates?.map((city, index) => {
              return (
                <tr
                  key={index}
                  className={`${city?._id === selectedCity?._id
                      ? "bg-[#bd7ee5] text-white"
                      : "text-black"
                    }`}
                >
                  <td className="border-b px-4 py-2 ">{city?.name}</td>
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
    </>
  );
};

export default City;
