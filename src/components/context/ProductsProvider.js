import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PRODUCT_SERVICE from "../services/ProductService";

export const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    productsList: [],
    search: [],
    orderItem: [],
    currentProduct: [],
    knobOpen: false,
    knobProduct: [],
    wishList: [], //PENDING
    shoppingCart: [],
    subTotal: 0,
    tax: 0,
    total: 0,
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
  };

  // ADD TO CART

  addToCart = (order) => {
    const { shoppingCart } = this.state;
    shoppingCart.push(order);
    this.setState((prevState) => ({
      ...prevState,
      shoppingCart: [...shoppingCart],
    }), this.calculateTotals()
    );
  };

  // GET ELEMENT

  getProduct = (id) => {
    const product = this.state.productsList.find(
      (oneProduct) => oneProduct._id === id
    );
    return product;
  };

  // SET ITEM BY ID

  setProductById = (id) => {
    // const product = this.state.productsList.find(oneProduct => oneProduct._id === id);
    const product = this.getProduct(id);
    this.setState({
      currentProduct: product,
      orderItem: product,
      knobProduct: product,
    });
  };

  // HANDLE EACH OPTION IN DESCRIPTION OF PRODUCT

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

  // OPEN MODAL

  openKnob = (id) => {
    const product = this.getProduct(id);
    this.setState({
      knobProduct: product,
      knobOpen: true,
    });
  };

  // CLOSE MODAL

  closeKnob = () => {
    this.setState({
      knobOpen: false,
    });
  };

  // INCREMENT

  addQuantity = (id) => {
    console.log('INCREMENT')
  }

  subtractQuantity = (id) => {
    console.log('DECREMENT')
  }

  deleteProduct = (id) => {
    console.log('DEleted ONE PRODUCT')
  }

  clearList = () => {
    console.log('DEleted LIST')
  }

  calculateTotals = () => {
    const { shoppingCart } = this.state
    let subTotal = 0;
    shoppingCart.map(eachProduct => (subTotal += eachProduct.cost));
    const taxTemp = subTotal * 0.07;
    const totalTax = parseFloat(taxTemp.toFixed(2));
    const total = subTotal + totalTax;
    this.setState({
      subTotal: subTotal,
      tax: totalTax,
      total: total
    })
    console.log('CALLING', shoppingCart)

  }



  render() {
    const {
      state,
      addToCart,
      setProductById,
      handleItem,
      handleSubmit,
      handleSearchItems,
      openKnob,
      closeKnob,
      addQuantity,
      subtractQuantity,
      deleteProduct,
      clearList,
    } = this;
    const {
      productsList,
      search,
      orderItem,
      knobOpen,
      shoppingCart,
      subTotal,
      tax,
      total,
    } = this.state;
    return (
      <ProductContext.Provider
        value={{
          state,
          knobOpen,
          productsList,
          search,
          orderItem,
          shoppingCart,
          subTotal,
          tax,
          total,
          openKnob,
          closeKnob,
          addToCart,
          handleItem,
          handleSubmit,
          handleSearchItems,
          setProductById,
          addQuantity,
      subtractQuantity,
      deleteProduct,
      clearList,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default withRouter(ProductProvider);
