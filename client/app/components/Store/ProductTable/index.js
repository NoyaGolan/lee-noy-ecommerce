import React from 'react';
import { Link } from 'react-router-dom';
import AddToWishList from '../AddToWishList';

const ProductList = ({ products, updateWishlist, authenticated }) => {
    return (
        <div className='product-list'>
            <table className='table'>
                <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Wishlist</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product, index) => {
                    const imageSrc = product.imageData
                        ? `data:${product.contentType};base64,${product.imageData}`
                        : '/images/placeholder-image.png';

                    return (
                        <tr key={product._id}>
                            <td>
                                <img src={imageSrc} alt={product.name} style={{ width: '100px', cursor: 'pointer' }} onClick={() => window.location.href = `/product/${product.slug}`} />
                            </td>
                            <td>
                                <Link to={`/product/${product.slug}`} className="text-dark">{product.name}</Link>
                            </td>
                            <td>{product.brand ? product.brand.name : 'N/A'}</td>
                            <td>{product.description}</td>
                            <td>${product.price}</td>
                            <td>
                                {product.totalReviews > 0 ? (
                                    <>
                                        <span className='fs-16 fw-normal mr-1'>{parseFloat(product.averageRating).toFixed(1)}</span>
                                        <span className={`fa fa-star ${product.totalReviews ? 'checked' : ''}`} style={{ color: '#ffb302' }}></span>
                                    </>
                                ) : (
                                    'No reviews'
                                )}
                            </td>
                            <td>
                                <AddToWishList
                                    id={product._id}
                                    liked={product?.isLiked ?? false}
                                    enabled={authenticated}
                                    updateWishlist={updateWishlist}
                                    authenticated={authenticated}
                                />
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
