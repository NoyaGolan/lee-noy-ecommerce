import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Button from '../../Common/Button';

// Function to convert buffer array to base64 string
// This is necessary if your imageData comes as a binary buffer
const bufferArrayToBase64 = (bufferArray) => {
  const binaryString = bufferArray.reduce((acc, value) => acc + String.fromCharCode(value), '');
  return btoa(binaryString);
};

const CartList = ({ cartItems, handleRemoveFromCart, toggleCart }) => {
  console.log({ cartItems });

  return (
      <div className='cart-list'>
        {cartItems.map((item, index) => {
          const imageSrc = item.imageData && item.imageData.data
              ? `data:${item.contentType};base64,${bufferArrayToBase64(item.imageData.data)}`
              : item.imageUrl
                  ? item.imageUrl
                  : '/images/placeholder-image.png';

          return (
              <div key={index} className='item-box'> {}
                <div className='item-details'>
                  <Container>
                    <Row className='mb-2 align-items-center'>
                      <Col xs='10' className='pr-0'>
                        <div className='d-flex align-items-center'>
                          <img
                              className='item-image mr-2'
                              src={imageSrc}
                              alt={item.name}
                          />
                          <Link
                              to={`/product/${item.slug}`}
                              className='item-link one-line-ellipsis'
                              onClick={toggleCart}
                          >
                            <h2 className='item-name one-line-ellipsis'>
                              {item.name}
                            </h2>
                          </Link>
                        </div>
                      </Col>
                      <Col xs='2' className='text-right'>
                        <Button
                            borderless
                            variant='empty'
                            ariaLabel={`remove ${item.name} from cart`}
                            icon={<i className='icon-trash' aria-hidden='true'></i>}
                            onClick={() => handleRemoveFromCart(item)}
                        />
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default CartList;
