import React from 'react';
import { Link } from 'react-router-dom';

// Function to convert an array of bytes into a base64 string
const bufferToBase64 = (buffer) => {
  const binary = buffer.map((byte) => String.fromCharCode(byte)).join('');
  return window.btoa(binary);
};

const ProductList = ({ products }) => {
  return (
      <div className='p-list'>
        {products.map((product, index) => {
            console.log('dasd')
          // Ensure that the imageData.data is present and is an array
          const imageDataArray = product.imageData && Array.isArray(product.imageData.data)
              ? product.imageData.data
              : [];

          // Convert the imageDataArray to a base64 string
          const base64String = bufferToBase64(imageDataArray);

          return (
              <Link
                  to={`/dashboard/product/edit/${product._id}`}
                  key={index}
                  className='d-flex flex-row align-items-center mx-0 mb-3 product-box'
              >
                <img
                    className='item-image'
                    // Set the image src to the base64 encoded string
                    src={`data:${product.contentType};base64,${base64String}`}
                    alt={product.name}
                    style={{ width: '100px', height: '100px' }} // Adjust the size as needed
                />
                <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
                  <h4 className='text-truncate'>{product.name}</h4>
                  <p className='mb-2 text-truncate'>{product.description}</p>
                </div>
              </Link>
          );
        })}
      </div>
  );
};

export default ProductList;
