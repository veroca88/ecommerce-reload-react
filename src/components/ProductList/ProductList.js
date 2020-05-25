import React, { Component } from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import Search from "../Search/Search";
import { ProductContext } from "../context/ProductsProvider";
class ProductList extends Component {
  render() {
    return (
      <>
        <div className="py-5">
          <Search />
          <ProductContext.Consumer>
            {(context) => {
              const { search } = context;

              return (
                <div className="container">
                  <div className="row">
                    {search.map((eachProduct, index) => {
                      return (
                        <SingleProduct key={index} eachProduct={eachProduct} />
                      );
                    })}
                  </div>
                </div>
              );
            }}
          </ProductContext.Consumer>
        </div>
      </>
    );
  }
}

export default ProductList;
