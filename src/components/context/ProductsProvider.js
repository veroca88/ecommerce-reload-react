import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PRODUCT_SERVICE from "../services/ProductService";

export const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    productsList: [],
    search: [],
    orderItem: [],
    shoppingCart: [],
    knobOpen: false,
    currentProduct: [],
    knobProduct: [],
    wishList: [],
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
      .catch((err) => console.log("Error while getting the product: ", err));
  }

  //TOGGLE WISHLIST

  // toggleProduct = (id) => {
  //   const { wishList } = this.state
  //   const product = this.getProduct(id);
  //   product.favorite = true;
  //   wishList.push(product);
  //   console.log('id', product)
  //   this.setState(state => ({
  //     wishList: [...wishList],
  //   }))
  //   console.log('wishList', this.state.wishList)
    
  // }

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

// GET ELEMENT

getProduct = (id) => {
  const product = this.state.productsList.find(oneProduct => oneProduct._id === id);
  return product

}

  // SET ITEM BY ID

  setProductById = (id) => {
    // const product = this.state.productsList.find(oneProduct => oneProduct._id === id);
    const product = this.getProduct(id);
    this.setState({
      currentProduct: product,
      orderItem: product,
      knobProduct: product
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

  // OPEN MODAL

  openKnob = (id) => {
    const product = this.getProduct(id);
    this.setState({
      knobProduct: product,
      knobOpen: true
    })
    console.log('OPEN-MODAL', this.state.knobOpen)
  }

  // CLOSE MODAL

  closeKnob = () => {
    this.setState({
      knobOpen: false
    })
    console.log('CLOSE-MODAL', this.state.knobOpen)
  } 

 

  render() {
    const {
      state,
      addToCart,
      toggleProduct,
      setProductById,
      handleItem,
      handleSubmit,
      handleSearchItems,
      openKnob,
      closeKnob,
    } = this;
    const {
      productsList,
      search,
      orderItem,     
      shoppingCart,
      toggle,
      knobOpen
    } = this.state;
    return (
      <ProductContext.Provider
        value={{
          state,
          knobOpen,
          productsList,
          search,
          orderItem,
          toggle,
          shoppingCart,
          openKnob,
          closeKnob,
          toggleProduct,          
          addToCart,  
          handleItem,
          handleSubmit,
          handleSearchItems,
          setProductById,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default withRouter(ProductProvider);
