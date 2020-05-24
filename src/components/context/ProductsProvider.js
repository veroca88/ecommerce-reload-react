import React, { Component } from 'react';

import PRODUCT_SERVICE from '../services/ProductService'
import { withRouter } from 'react-router-dom';

export const ProductContext  = React.createContext()

class ProductProvider extends Component {
    state = {
        productsList: [],
        search: [],
        cart: [],
        knobOpen: true,

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

    // eachProductDetails = (list) => {
    //     list.map(product => {
    //         console.log('PRODUCT DETAILS', product)
    //     })
    // }

    handleSearchItems = (e) => {
        const { value } = e.target;
        const { productsList } = this.state;
    
        const searchItems = productsList.filter((item) => {
          console.log("Here is the iteeeeeeeeeeeeeem", item);
          return item.description.toUpperCase().includes(value.toUpperCase());
          // for (let ea in item) {
          //   if (item[ea] === value) {
          //     return item[ea].toLowerCase().includes(value.toLowerCase())
          //   }
          // }
        });
        this.setState({
          search: searchItems,
          productsList: productsList,
        });
      };

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
                addToCart,
            }}>
                {this.props.children}
            </ProductContext.Provider>
            
        );
    }
}


export default withRouter (ProductProvider);