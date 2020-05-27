import React, { Component } from "react";
import { Link } from "react-router-dom";

import { ProductContext } from "../context/ProductsProvider";


// List of all the products

class SingleProduct extends Component {
  
  render() {
    const { _id, name, cost, image, inShoppingCart } = this.props.eachProduct;
    return (
      <ProductContext.Consumer>
        {context => (
            <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
              <div className="card">
                <div className="img-container"
                onClick={() => context.setProductById(_id)}
                >
                  <Link
                    to={{
                      pathname: `/details/${_id}`
                    }}
                  >
                    <img
                      className="imageHeigth card-img"
                      src={image}
                      alt={name}
                    />
                  </Link>
                  <div className="text-card">
                    <p>{name}</p>
                    <p>${cost}</p>
                  </div>

                  <button
                    className="cart-btn"
                    disabled={inShoppingCart ? true : false}
                    onClick={() => context.openKnob(_id)}                     
                      >
                       <i className="fas fa-search-plus"></i>
                    
                  </button>
                </div>
              </div>
            </div>
          // );
        // }
        )
        }
      </ProductContext.Consumer>
        );
      }
    }

export default SingleProduct;
