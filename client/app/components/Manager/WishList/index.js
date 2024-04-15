import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { XIcon } from '../../Common/Icon';

// Function to convert buffer array to base64 string
// Only needed if your imageData needs conversion
const bufferArrayToBase64 = (bufferArray) => {
    const binaryString = bufferArray.reduce((acc, value) => acc + String.fromCharCode(value), '');
    return btoa(binaryString);
};

const WishList = ({ wishlist, updateWishlist }) => {
    const getProductImage = (item) => {
        if (item.product) {
            const { product } = item;

            let imageSrc = '/images/placeholder-image.png'; // Default to placeholder image

            if (product.imageData) {
                // Check if imageData is already a base64 string or needs conversion
                imageSrc = `data:${product.contentType};base64,${bufferArrayToBase64(product.imageData.data)}`;

            }

            return (
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img className='item-image' src={imageSrc} alt={product.name} />
                </div>
            );
        }
    };

    return (
        <div className='w-list'>
            {wishlist.map((item) => (
                <div key={item.product._id} className='d-flex flex-row align-items-center mx-0 mb-3 wishlist-box'>
                    <Link to={`/product/${item.product.slug}`} className='d-flex flex-1 align-items-center text-truncate'>
                        {getProductImage(item)}
                        <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
                            <h4 className='text-truncate'>{item.product.name}</h4>
                            <p className='mb-2 price'>${item.product.price}</p>
                            <label className='text-truncate'>{`Wishlist Added on ${formatDate(item.created)}`}</label>
                        </div>
                    </Link>
                    <Button
                        variant='danger'
                        icon={<XIcon className='text-white' width={15} />}
                        round={20}
                        onClick={() => updateWishlist(!item.isLiked, item.product._id)}
                        className='remove-wishlist-box'
                    />
                </div>
            ))}
        </div>
    );
};

export default WishList;
