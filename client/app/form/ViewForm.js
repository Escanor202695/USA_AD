'use client';
import React, { useEffect, useState } from 'react';
import ClientForm from '../components/adminForm/ClientForm';
import axios from '../../utils/axios';

const ViewForm = () => {

  const [formValues, setFormsValuse] = useState(null);
  const fetchData = async () => {
    const response = await axios.get(
      "/dynamicform/form/v1"
    );
    const data = response.data?.data;
    setFormsValuse(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
    <div className='flex justify-center pt-[120px]'>
    <h1 className='text-white text-2xl font-bold'>Add your listing</h1>
    </div>
    <div className=" pt-5 pb-[50px] w-[80%] md:w-[75%] mx-auto">
      <ClientForm preview={false} formValues={formValues} />
    </div>
    </>
  );
};

export default ViewForm;
