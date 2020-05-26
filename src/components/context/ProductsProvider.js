import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PRODUCT_SERVICE from "../services/ProductService";
import axios from "axios";

export const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    productsList: [],
    search: [],
    orderItem: [],
    productDetail: [], //detail of item
    tempProduct: [],
    shoppingCart: [],
    user: [],
    isInCart: false,
    knobOpen: true,
    currentProduct: []
  };

  componentDidMount() {
    PRODUCT_SERVICE.getProducts()
      .then((responseFromServer) => {
        console.log(
          "Authentication.js, LINE31 Response from db: ",
          responseFromServer.data
        );
        this.setState((prevState) => ({
          ...prevState,
          productsList: responseFromServer.data,
          search: responseFromServer.data,
        }));
      })
      .catch((err) => console.log("Error while getting the user: ", err));
  }

  // SEARCH BAR

  handleSearchItems = (e) => {
    e.preventDefault();
    const { value } = e.target;
    const { productsList } = this.state;
    console.log("search value", value);
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
      productsList: productsList,
    });
  };
  
  // HANDLE SUBMIT FORM


  handleSubmit = (e) => {
    e.preventDefault();
    const { orderItem } = this.state;
    orderItem.inShoppingCart = true;
    orderItem.count = 1;
    const price = orderItem.cost; 
    orderItem.total = price;
        this.setState((prevState) => ({
          ...prevState,
          orderItem: { ...orderItem },
        }));
        console.log('handlesubmit', this.state.orderItem);
        console.log('CART added', this.state.shoppingCart)
      };

// ADD TO CART

addToCart = (order) => {
  const { shoppingCart } = this.state
  shoppingCart.push(order)
  this.setState(prevState => ({
    ...prevState,
    shoppingCart: [...shoppingCart]
  }))
  console.log('CART added', this.state.shoppingCart)
}

  // GET ITEM BY ID

  getProductById = (id) => {
    const product = this.state.productsList.find(oneProduct => oneProduct._id === id);
    this.setState({
      currentProduct: product,
      orderItem: product
    })
  };


  // HANDLE EACH OPTION IN DESCRIPTION OF PRODUCT

  handleItem = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    console.log("THIS IS VALUE", value);
    console.log("THIS IS NAME", name);
    this.setState((prevState) => ({
      ...prevState,
      orderItem: {
        ...prevState.orderItem,
        [name]: value,
      },
    }));
  };

  

 

  render() {
    const {
      state,
      addToCart,
      handleDescription,
      getProductById,
      handleItem,
      handleSubmit,
      handleSearchItems,
    } = this;
    const {
      productsList,
      search,
      orderItem,
      isInCart,
      shoppingCart,
    } = this.state;
    return (
      <ProductContext.Provider
        value={{
          state,
          productsList,
          search,
          orderItem,
          isInCart,
          shoppingCart,
          addToCart,
          handleDescription,
          handleItem,
          handleSubmit,
          handleSearchItems,
          getProductById,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default withRouter(ProductProvider);
