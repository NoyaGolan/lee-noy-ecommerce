import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import ProductTable from '../../components/Store/ProductTable';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class ProductsShop extends Component {
  state = {
    viewMode: 'list',
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts(slug);
  }

  toggleViewMode = (mode) => {
    this.setState({ viewMode: mode });
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist } = this.props;
    const { viewMode } = this.state;
    const displayProducts = products && products.length > 0;

    return (
        <div className='products-shop'>
          {isLoading && <LoadingIndicator />}
          {displayProducts ? (
              <>
                <div className="view-mode-selector">
                  <button onClick={() => this.toggleViewMode('list')}>List View</button>
                  <button onClick={() => this.toggleViewMode('table')}>Table View</button>
                </div>
                {viewMode === 'list' ? (
                    <ProductList
                        products={products}
                        authenticated={authenticated}
                        updateWishlist={updateWishlist}
                    />
                ) : (
                    <ProductTable
                        products={products}
                        authenticated={authenticated}
                        updateWishlist={updateWishlist}
                    />
                )}
              </>
          ) : (
              !isLoading && <NotFound message='No products found.' />
          )}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.storeProducts,
  isLoading: state.product.isLoading,
  authenticated: state.authentication.authenticated
});

export default connect(mapStateToProps, actions)(ProductsShop);
