import React, { Component } from 'react';
import SingleProduct from '../SingleProduct/SingleProduct'

class ProductList extends Component {
    render() {
        return (
            <div>
                <h3>Hello from Product list</h3>
                <SingleProduct />
            </div>
        );
    }
}

export default ProductList;