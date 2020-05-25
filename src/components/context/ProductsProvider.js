import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PRODUCT_SERVICE from '../services/ProductService';
import axios from 'axios';

export const ProductContext  = React.createContext()

class ProductProvider extends Component {
    state = {
        productsList: [],
        search: [],
        orderItem: [],
        tempProduct: [],
        shoppingCart: [],
        user: [],
        isInCart: false,
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

    // Search bar

  handleSearchItems = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const { productsList } = this.state;
    console.log('search value', value)
    const searchItems = productsList.filter((item) => {
      return item.description.toUpperCase().includes(value.toUpperCase());
      // for (let ea in item) {
      //   if (item[ea] === value) {
      //     return item[ea].toLowerCase().includes(value.toLowerCase())
      //   }
      //
    });
      this.setState({
      search: searchItems,
      productsList: productsList
    });
  };

      // Handle submit form

  handleSubmit = (e) => {
    e.preventDefault();
    const { orderItem } = this.state;
    // this.props.history.push("/");
    this.setState((prevState) => ({
          ...prevState,
          orderItem: { ...orderItem },
        }));
  };

  // Handle any change on order product

  handleItem = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      orderItem: {
        ...prevState.orderItem,
        [name]: value,
      },
    }));
  };

  
  handleItemInCart = (e) => {
        const { name, value } = e.target;
        const { orderItem, shoppingCart } = this.state;
        const currentState = orderItem;
        console.log('TRUE OR FALSEbefore', orderItem.inShoppingCart)
        orderItem.inShoppingCart = true;
        orderItem.count = 1;
        const price = orderItem.cost;
        orderItem.total = price
        // currentState.userShoppingCart.items.push(orderItem);
        shoppingCart.push(orderItem);
        currentState[name] = value;
        this.setState((state) => ({
          shoppingCart: [...shoppingCart],
          tempProduct: currentState,
          isInCart: !state.isInCart,
        }));
        console.log('TRUE OR FALSE after', this.state.isInCart)
        console.log("SHOPPING CART", this.state.shoppingCart);
      };

      
     

    handleDescription = (id) => {
        console.log('hello from description')
    }

    addToCart = () => {
        console.log('add to cart')
    }

    render() {
        const { state, handleDescription, addToCart, handleItem, handleSubmit, handleSearchItems } = this;
        const { productsList, search, orderItem, isInCart, shoppingCart } = this.state
        return (
            <ProductContext.Provider
            value = {{
                state,
                productsList,
                search,
                orderItem,
                isInCart,
                shoppingCart,
                handleDescription,
                handleItem,
                addToCart,
                handleSubmit,
                handleSearchItems
            }}>
                {this.props.children}
            </ProductContext.Provider>
            
        );
    }
}


export default withRouter (ProductProvider);