import React, { Component } from 'react';

import PRODUCT_SERVICE from '../services/ProductService'

const ProductContext = React.createContext()

class ProductsProvider extends Component {
    state = {
        productsList: [],
        search: []
    }

    componentDidMount() {
        PRODUCT_SERVICE.getProducts()
        .then(responseFromServer => {
            // here i see the user
            console.log('Authentication.js, LINE31 Response from db: ', responseFromServer.data);
    
            this.setState(prevState => ({
              ...prevState,
              productsList: responseFromServer.data,
              search: responseFromServer.data,
              
            }));
          })
          .catch(err =>
            console.log('Error while getting the user: ', err)
          );
    }

    handleDescription = () => {
        console.log('hello from description')
    }

    addToCart = () => {
        console.log('add to cart')
    }

    render() {
        const { state, handleDescription, addToCart } = this;
        const { productsList, search } = this.state
        return (
            <ProductContext.Provider
            value = {{
                state,
                productsList,
                search,
                handleDescription,
                addToCart
            }}>
                {this.props.children}
            </ProductContext.Provider>
            
        );
    }
}

const ProductConsumer = ProductContext.Consumer

export { ProductsProvider, ProductConsumer };