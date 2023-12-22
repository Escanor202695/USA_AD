import React from 'react';
import { Form, Input } from 'antd';

const TextField = ({ name, rules }) => {
  return (
    <Form.Item label={name} name={name} rules={rules}>
      <Input className='rounded-lg' />
    </Form.Item>
  );
};

export default TextField;
