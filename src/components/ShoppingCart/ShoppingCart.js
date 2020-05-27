import React, { Component } from "react";
import Header from "./HeaderShoppingCart";
import EmptyCart from "./EmptyShoppingBag";
import List from './ListShoppingCart'
import Footer from './FooterShoppingCart'

import { ProductContext } from "../context/ProductsProvider";

export default class ShoppingCart extends Component {
  render() {
    return (
      <section>
        <ProductContext.Consumer>
          {(context) => {
            const { shoppingCart } = context;
            if (shoppingCart.length > 0) {
              return (
                <>
                  <h5 className="text-full-shop">Shopping Cart</h5>
                  <Header />
                  <List value={context} /> 
                  <Footer value={context} />               
                </>
              );
            } else {
              return <EmptyCart />;
            }
          }}
        </ProductContext.Consumer>
      </section>
    );
  }
}
