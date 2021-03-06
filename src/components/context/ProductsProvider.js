import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import PRODUCT_SERVICE from "../services/ProductService";

export const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    productsList: [],
    search: [],
    orderItem: [],
    currentProduct: [],
    detailProduct: [],
    knobOpen: false,
    knobProduct: [],
    wishList: [], //PENDING
    shoppingCart: [],
    subTotal: 0,
    tax: 0,
    total: 0,
  };

  
  componentDidMount() {
    this.mountProducts()
  }

  mountProducts = () => {
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
      const { productsList, shoppingCart } = this.state
     let tempProducts = [...productsList];
     order.inShoppingCart = true;
     order.count = 1;
     const price = (order.price * order.count)
     order.total = price;
     shoppingCart.push(order)
     this.setState({
       productsList: tempProducts,
       shoppingCart: [...shoppingCart],
       detailProduct: {...order}
     }, this.addTotals())     
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
 // GET ELEMENT

  getProduct = (id) => {
    const product = this.state.productsList.find(
      (oneProduct) => oneProduct._id === id
    );
    return product;
  };

  // SET ITEM BY ID

  setProductById = (id) => {
    const product = this.getProduct(id);
    this.setState({
      currentProduct: product,
      orderItem: product,
      knobProduct: product,
    });
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
    const { shoppingCart } = this.state;
    let tempCart = [...shoppingCart]

    let productInChange = tempCart.find(product => product._id === id)
    productInChange.count += 1;
      productInChange.total = productInChange.count * productInChange.cost
      this.setState({
        orderItem: productInChange,
        shoppingCart: [...tempCart]
      }, this.addTotals);
  };

  subtractQuantity = (id) => {
    const { shoppingCart } = this.state;
    let tempCart = [...shoppingCart]

    let productInChange = tempCart.find(product => product._id === id)
    productInChange.count -= 1;
    if (productInChange.count === 0) {
      this.deleteProduct(id);
    } else {
      productInChange.total = productInChange.count * productInChange.cost
      this.setState({
        orderItem: productInChange,
        shoppingCart: [...tempCart]
      }, this.addTotals);
    }
  };

  deleteProduct = (id) => {
    const { shoppingCart } = this.state;
    let tempCart = [...shoppingCart];
    let subTotal = 0;
    tempCart = tempCart.filter((product) => product._id !== id);
    tempCart.map((eachProduct) => (subTotal += eachProduct.cost));
    const taxTemp = subTotal * 0.07;
    const totalTax = parseFloat(taxTemp.toFixed(2));
    const total = subTotal + totalTax;
    this.setState({
      shoppingCart: [...tempCart],
      subTotal: subTotal,
      tax: totalTax,
      total: total,
    });
  };

  clearList = () => {
    this.setState({
      shoppingCart: [],
    });
  };

  addTotals = () => {
    const { shoppingCart } = this.state;
    let subTotal = 0;
    console.log('sc', shoppingCart) 
    let tempCart = Object.values(shoppingCart)
    tempCart.map(eachProduct => {
      subTotal = subTotal + (eachProduct.cost * eachProduct.count)});
      const taxTemp = subTotal * 0.07
      const totalTax = parseFloat(taxTemp.toFixed(2));
      const total = subTotal + totalTax;
    this.setState(
      {
        subTotal: subTotal,
        tax: totalTax,
        total: total,
      })
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
      randomCard
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
          randomCard
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

export default withRouter(ProductProvider);
