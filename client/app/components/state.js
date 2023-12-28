import City from "./city";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import axios from "../../utils/axios";
import NormalPlus from "./svg/NormalPlus";
import { toast } from "react-toastify";

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
  useEffect(() => {
    if (selectedState) { }
    else if (filteredStates && filteredStates.length > 0) {
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
                  onClick={() => handleStateClick(state)}
                  className={`${state?._id === selectedState?._id
                    ? "bg-[#bd7ee5] text-white"
                    : "text-black"
                    } border`}
                >
                  <td className=" px-4 py-2">{state?.name}</td>
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
