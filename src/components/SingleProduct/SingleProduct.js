import React, { Component } from "react";
import { Link } from "react-router-dom";

class SingleProduct extends Component {
  render() {
    const { _id, name, cost, image, inShoppingCart } = this.props.eachProduct;
    return (
      <div className="col-9 mx-auto col-md-6 col-lg-3 my-3">
        <div className="card">
          <div
            onClick={console.log("You clicked it")}
            className="img-container"
          >
              <Link to={{
                pathname: `/details/${_id}`,
                state: {
                    props: this.props.eachProduct
                }
            }}>
              <img className="imageHeigth card-img" src={image} alt={name} />
            </Link>
            <div className="text-card">
              <p>{name}</p>
              <p>${cost}</p>
            </div>

            <button
              className="cart-btn"
              disabled={inShoppingCart ? true : false}
              onClick={() => {
                console.log("add to the cart...");
              }}
            >
              {inShoppingCart ? (
                <i className="fas fa-cart-arrow-down" disabled></i>
              ) : (
                <i className="fas fa-tag"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProduct;
