import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import ProductTable from '../../components/Store/ProductTable'; // Assuming you have this component
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class CategoryShop extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      viewMode: 'list'  // Default to list view
    };
  }

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.filterProducts('category', slug);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.filterProducts('category', slug);
    }
  }

  toggleViewMode = (mode) => {
    this.setState({ viewMode: mode });
  }

  render() {
    const { products, isLoading, authenticated, updateWishlist } = this.props;
    const { viewMode } = this.state;

    return (
        <div className='category-shop'>
          {isLoading && <LoadingIndicator />}
          <div className="view-mode-selector">
            <button onClick={() => this.toggleViewMode('list')}>List View</button>
            <button onClick={() => this.toggleViewMode('table')}>Table View</button>
          </div>
          {products && products.length > 0 ? (
              viewMode === 'list' ? (
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
              )
          ) : (
              !isLoading && <NotFound message='No products found.' />
          )}
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(CategoryShop);
