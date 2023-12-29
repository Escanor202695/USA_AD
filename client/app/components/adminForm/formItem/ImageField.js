import React, { useState } from "react";
import { Form, Input, Upload } from "antd";

const ImageField = ({ name, rules }) => {
  const [fileList, setFileList] = useState([]);
  const onChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);
    if (newFileList.length > 0 && newFileList[0].response) {
      console.log("Image upload response:", newFileList[0]?.response?.url);
    }
  };
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Form.Item
    label={<span style={{ color: "white" }}>{name}</span>}
    name={name}
      rules={rules}
    >
      <Upload
        action="http://localhost:4000/api/dynamicform/upload"
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        className="bg-white flex flex-1 p-6 justify-center rounded-lg"
      >
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </Form.Item>
  );
};

export default ImageField;
