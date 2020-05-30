import React, { Component } from "react";
import { ProductContext } from "../context/ProductsProvider";
import { Link } from "react-router-dom";

// Product description

class DetailsProduct extends Component {  
  render() {
    return (
      <>
        <ProductContext.Consumer>
          {context => {
            const { currentProduct, orderItem } = context.state;
            const { handleItem, addToCart, handleSubmit,  } = context
            return (
              <section>
                <form onSubmit={handleSubmit}>
                  <div className="image-box">
                    <div className="row ">
                      <div className="col-md-8">
                        <img
                          alt={orderItem.name}
                          src={orderItem.image}
                          className="w-100"
                        />
                      </div>
                      <div className="col-md-4 product-info">
                        <h4 className="product-title">{orderItem.name}</h4>
                        <hr />
                        <p>
                          Price:{" "}
                          <strong className="cost-box">
                            ${orderItem.cost}
                          </strong>
                        </p>
                        <p>
                          Material :
                          <strong className="material-box">
                            {orderItem.material}
                          </strong>
                        </p>
                        <div className="size-box">
                          <select name="size" 
                          onChange={handleItem}
                          >
                            <option>Select size</option>
                            {currentProduct.size &&
                              currentProduct.size.map((eachSize, index) => {
                                return (
                                  <option key={index} value={eachSize}>
                                    {eachSize}
                                  </option>
                                );
                              })}
                          </select>
                        </div>

                        <div className="size-box">
                          <select name="color" 
                          onChange={handleItem}
                          >
                            <option>Select color</option>
                            {currentProduct.color &&
                              currentProduct.color.map((eachColor, index) => {
                                return (
                                  <option key={index} value={eachColor}>
                                    {eachColor}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                        <div>
                          <button
                            className="btn btn-lg btn-dark text-uppercase"  
                            disabled={orderItem.inShoppingCart ? true : false}
                            onClick={() => {
                              addToCart(orderItem);
                            }}
                          >
                            {orderItem.inShoppingCart ? (
                              <h6 disabled>In Cart</h6>
                            ) : (
                              <h6>Add to Cart</h6>
                            )}
                          </button>

                          <Link to="/products">
                            <button 
                            className="btn btn-lg btn-dark text-uppercase">
                              <h6>Back to Products</h6>
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            )
          }}
        </ProductContext.Consumer>
      </>
    );
  }
}

export default DetailsProduct;
