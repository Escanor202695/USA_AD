import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";

const ImageDisplayBig = ({ imageUrl }) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`/dynamicform/download/${imageUrl}`, {
          responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data, "binary").toString("base64");
        const imageDataUrl = `data:image/png;base64,${buffer}`;
        setImage(imageDataUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    if (imageUrl) {
      fetchImage();
    }

    return () => {
      // Cleanup logic if needed
    };
  }, [imageUrl]);

  return <img src={image} alt="Uploaded" className={`w-full h-[120px] object-cover`} />;
};

export default ImageDisplayBig;
