import React, { useState } from "react";
import { Form, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageField = ({ name, rules }) => {
  const [fileList, setFileList] = useState([]);
  const [fileItem, setFileItem] = useState(null);
  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    const uploadedImages = newFileList
      .filter((file) => file.response)
      .map((file) => file.response.url);
    setFileItem(uploadedImages);
    console.log("Image upload response:", fileItem);
  };

  const onPreview = async (file) => {
    // Your existing onPreview logic
  };

  return (
    <Form.Item
      label={<span style={{ color: "white" }}>{name}</span>}
      name={name}
      rules={rules}
      value={fileItem}
    >
      <Upload
        action={`${process.env.NEXT_PUBLIC_BACKEND_URL}/dynamicform/upload`}
        fileList={fileList}
        onChange={onChange}
        className="flex-1 bg-white flex rounded-lg p-2"
        multiple // Enable multiple file selection
      >
        <Button icon={<UploadOutlined />} className="bg-white">
          Click to Upload
        </Button>
      </Upload>
    </Form.Item>
  );
};

export default ImageField;
