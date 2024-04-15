import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date';

// Utility function for converting buffer array to base64 string
const bufferToBase64 = (bufferArray) => {
  const binary = bufferArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return window.btoa(binary);
};

const OrderList = props => {
  const { orders } = props;

  const renderFirstItem = order => {
    if (order.products && order.products[0].product) {
      const product = order.products[0].product;

      // Determine the correct image source
      let imageSrc = '/images/placeholder-image.png'; // Default placeholder image
      if (product.imageData) {
        if (typeof product.imageData === 'string') {
          // If imageData is already a base64 string
          imageSrc = `data:${product.contentType};base64,${product.imageData}`;
        } else if (product.imageData.data) {
          // If imageData is a binary buffer, convert to base64 string
          imageSrc = `data:${product.contentType};base64,${bufferToBase64(product.imageData.data)}`;
        }
      } else if (product.imageUrl) {
        imageSrc = product.imageUrl;
      }

      return (
          <img
              className='item-image'
              src={imageSrc}
              alt="Product Image"
          />
      );
    } else {
      return <img className='item-image' src='/images/placeholder-image.png' alt="Default Image" />;
    }
  };

  return (
      <div className='order-list'>
        {orders.map((order, index) => (
            <div key={index} className='order-box'>
              <Link to={`/order/${order._id}`} className='d-block box-link'>
                <div className='d-flex flex-column flex-lg-row mb-3'>
                  <div className='order-first-item p-lg-3'>
                    {renderFirstItem(order)}
                  </div>
                  <div className='d-flex flex-column flex-xl-row justify-content-between flex-1 ml-lg-2 mr-xl-4 p-3'>
                    <div className='order-details'>
                      <div className='mb-1'>
                        <span>Status</span>
                        {order?.products ? (
                            <span className='order-label order-status'>{` ${order.products[0].status}`}</span>
                        ) : (
                            <span className='order-label order-status'> Unavailable</span>
                        )}
                      </div>
                      <div className='mb-1'>
                        <span>Order #</span>
                        <span className='order-label'>{` ${order._id}`}</span>
                      </div>
                      <div className='mb-1'>
                        <span>Ordered on</span>
                        <span className='order-label'>{` ${formatDate(order.created)}`}</span>
                      </div>
                      <div className='mb-1'>
                        <span>Order Total</span>
                        <span className='order-label'>{` $${order.totalWithTax ? order.totalWithTax : 0}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
        ))}
      </div>
  );
};

export default OrderList;
