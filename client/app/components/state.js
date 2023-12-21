import City from "./city";
import { useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";

const State = ({ states, countryId, countryName, refetch }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStateClick = (state) => {
    setSelectedState(state);
  };

  const filteredStates = states?.filter((state) =>
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
        await addState(values);
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

  const addState = async (values) => {
    try {
      const response = await axios.post(`/dynamicform/add-state/${countryId}`, {
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
                States
                <div className="border px-4 py-2 mt-2 items-center">
                  <button onClick={showModal}>Add State</button>
                </div>
              </th>
            </tr>
            <tr>
              <th className="border px-4 py-2">
                <input
                  id="search-countries"
                  type="search"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Search States.."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </th>
            </tr>
          </thead>
          <tbody className="countries-tb overflow-y-scroll">
            {filteredStates?.map((state, index) => {
              return (
                <tr key={index} onClick={() => handleStateClick(state)} className={`${state?._id === selectedState?._id ? "bg-red-700" : ''}`}>
                  <td className="border px-4 py-2">{state?.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      {selectedState && (
        <City
          cities={selectedState?.cities}
          stateId={selectedState?._id}
          stateName={selectedState?.name}
          refetch={refetch}
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
    </>
  );
};

export default State;
