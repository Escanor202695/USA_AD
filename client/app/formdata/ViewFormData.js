"use client";
import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import ImageDisplay from "./ImageDisplay";

const ViewFormData = () => {
  const [formData, setFormData] = useState(null);
  const fetchData = async () => {
    const response = await axios.get("/dynamicform/formdata");
    console.log(response.data);
    const data = response.data;
    setFormData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderFormDataItem = (formDataItem) => {
    return (
      <div key={formDataItem?._id?.$oid}>
        {formDataItem?.data &&
          Object.entries(formDataItem?.data).map(
            ([sectionName, sectionData]) => {
              return (
                <div key={sectionName}>
                  <h2>{sectionName}</h2>
                  {Object.entries(sectionData).map(([key, value]) => {
                    if (Array.isArray(value)) {
                      return (
                        <div key={key}>
                          <span>{key}</span>
                          {value.map((item, index) => (
                            <div key={index}>
                              <ImageDisplay imageUrl={item.url} />
                            </div>
                          ))}
                        </div>
                      );
                    } else if (typeof value === "object") {
                      if (value.type === "image") {
                        return (
                          <div key={key}>
                            <span>{key}</span>
                            <ImageDisplay imageUrl={value.url} />
                          </div>
                        );
                      } else {
                        return renderFormDataItem({ data: value });
                      }
                    } else {
                      return (
                        <p key={key}>
                          {key}: {value}
                        </p>
                      );
                    }
                  })}
                </div>
              );
            }
          )}
      </div>
    );
  };

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      {formData?.map((formDataItem) => {
        return renderFormDataItem(formDataItem);
      })}
    </div>
  );

  return (
    <div className="pt-[100px] pb-[50px] w-[80%] md:w-[75%] mx-auto">
      {formData?.map((form, index) => {
        return (
          <div key={index}>
            {form?.data &&
              Object.entries(form?.data).map(([key, value]) => {
                if (typeof value === "object") {
                  if (value?.type === "image") {
                    return <ImageDisplay key={key} imageUrl={value?.url} />;
                  }
                  return null;
                } else
                  return (
                    <p key={key}>
                      {key}: {form.data[key]}
                    </p>
                  );
              })}
          </div>
        );
      })}
    </div>
  );
};

export default ViewFormData;
