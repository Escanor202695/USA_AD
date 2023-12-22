'use client';
import React, { useEffect, useState } from 'react';
import ClientForm from '../components/adminForm/ClientForm';
import axios from '../../utils/axios';

const ViewForm = () => {

  const [formValues, setFormsValuse] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      "/dynamicform/formdata/v1"
    );
    const data = response.data?.data;
    setFormsValuse(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <ClientForm preview={false} formValues={formValues} />
    </div>
  );
};

export default ViewForm;
