// ImageGrid.js
import React from 'react';
import CardImage from './CardImage';

const ImageGrid = ({ images }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {images.map((image, index) => (
        <CardImage
          key={index}
          imageSrc={image.src}
          cityName={image.cityName}
          status={image.status}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
