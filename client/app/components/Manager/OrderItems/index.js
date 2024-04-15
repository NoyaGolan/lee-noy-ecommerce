import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, DropdownItem } from 'reactstrap';

import { ROLES, CART_ITEM_STATUS } from '../../../constants';
import Button from '../../Common/Button';
import DropdownConfirm from '../../Common/DropdownConfirm';

// Utility function for converting binary buffer to base64 string
const bufferToBase64 = (bufferArray) => {
  const binary = bufferArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return window.btoa(binary);
};

const OrderItems = props => {
  const { order, user, updateOrderItemStatus } = props;

  const renderPopoverContent = item => {
    const statuses = Object.values(CART_ITEM_STATUS);

    return (
        <div className='d-flex flex-column align-items-center justify-content-center'>
          {statuses.map((s, i) => (
              <DropdownItem
                  key={`${s}-${i}`}
                  className={s === item?.status ? 'active' : ''}
                  onClick={() => updateOrderItemStatus(item._id, s)}
              >
                {s}
              </DropdownItem>
          ))}
        </div>
    );
  };

  const renderItemsAction = item => {
    const isAdmin = user.role === ROLES.Admin;

    if (item.status === CART_ITEM_STATUS.Delivered) {
      return (
          <Link
              to={`/product/${item.product.slug}`}
              className='btn-link text-center py-2 fs-12'
              style={{ minWidth: 120 }}
          >
            Review Product
          </Link>
      );
    } else if (item.status !== 'Cancelled') {
      if (!isAdmin) {
        return (
            <DropdownConfirm label='Cancel'>
              <div className='d-flex flex-column align-items-center justify-content-center p-2'>
                <p className='text-center mb-2'>{`Are you sure you want to cancel ${item.product?.name}?`}</p>
                <Button
                    variant='danger'
                    id='CancelOrderItemPopover'
                    size='sm'
                    text='Confirm Cancel'
                    role='menuitem'
                    className='cancel-order-btn'
                    onClick={() => updateOrderItemStatus(item._id, 'Cancelled')}
                />
              </div>
            </DropdownConfirm>
        );
      } else {
        return (
            <DropdownConfirm label={item.product && item.status} className={isAdmin ? 'admin' : ''}>
              {renderPopoverContent(item)}
            </DropdownConfirm>
        );
      }
    }
  };

  const getImageSource = (product) => {
    if (product.imageData) {
      if (typeof product.imageData === 'string') {
        return `data:${product.contentType};base64,${product.imageData}`;
      } else if (product.imageData.data) {
        return `data:${product.contentType};base64,${bufferToBase64(product.imageData.data)}`;
      }
    }
    return product.imageUrl || '/images/placeholder-image.png';
  };

  return (
      <div className='order-items pt-3'>
        <h2>Order Items</h2>
        <Row>
          {order.products.map((item, index) => (
              <Col xs='12' key={index} className='item'>
                <div className='order-item-box'>
                  <div className='d-flex justify-content-between flex-column flex-md-row'>
                    <div className='d-flex align-items-center box'>
                      <img
                          className='item-image'
                          src={getImageSource(item.product)}
                          alt={item.product?.name || "Product Image"}
                      />
                      <div className='d-md-flex flex-1 align-items-start ml-4 item-box'>
                        <div className='item-details'>
                          {item.product ? (
                              <>
                                <Link
                                    to={`/product/${item.product.slug}`}
                                    className='item-link'
                                >
                                  <h4 className='d-block item-name one-line-ellipsis'>
                                    {item.product.name}
                                  </h4>
                                </Link>
                                <div className='d-flex align-items-center justify-content-between'>
                            <span className='price'>
                              ${item.purchasePrice || item.product.price}
                            </span>
                                </div>
                              </>
                          ) : (
                              <h4>Not Available</h4>
                          )}
                        </div>
                        <div className='d-flex justify-content-between flex-wrap d-md-none mt-1'>
                          <p className='mb-1 mr-4'>
                            Status
                            <span className='order-label order-status'>{` ${item.status}`}</span>
                          </p>
                          <p className='mb-1 mr-4'>
                            Quantity
                            <span className='order-label'>{` ${item.quantity}`}</span>
                          </p>
                          <p>
                            Total Price
                            <span className='order-label'>{` $${item.totalPrice}`}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='d-none d-md-flex justify-content-between align-items-center box'>
                      <div className='text-center'>
                        <p className='order-label order-status'>{`${item.status}`}</p>
                        <p>Status</p>
                      </div>
                      <div className='text-center'>
                        <p className='order-label'>{` ${item.quantity}`}</p>
                        <p>Quantity</p>
                      </div>
                      <div className='text-center'>
                        <p className='order-label'>{` $${item.totalPrice}`}</p>
                        <p>Total Price</p>
                      </div>
                    </div>
                  </div>
                  {item.product && (
                      <div className='text-right mt-2 mt-md-0'>
                        {renderItemsAction(item)}
                      </div>
                  )}
                </div>
              </Col>
          ))}
        </Row>
      </div>
  );
};

export default OrderItems;
