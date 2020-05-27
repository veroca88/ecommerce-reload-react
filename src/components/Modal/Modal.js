import React from "react";
import { ProductContext } from "../context/ProductsProvider";
import { Link } from "react-router-dom";

export default function Modal() {
  return (
    <ProductContext.Consumer>
      {(context) => {
        const { knobOpen, closeKnob, orderItem } = context;
        if (!knobOpen) {
          return null;
        } else {
          return (
            <div className="modal-container">
              <div className="container">
                <div className="row">
                  <div
                    id="modal"
                    className="col-8 mx-auto col-md-6 col-lg-4 text-center p-5"
                  >
                    <h5>Quick View</h5>
                    <img
                      src={orderItem.image}
                      alt={orderItem.name}
                      className="img-fluid"
                    />
                    <h5>{orderItem.name}</h5>
                    <Link
                      to={{
                        pathname: `/details/${orderItem._id}`,
                      }}
                    >
                      <button onClick={() => closeKnob()}>Add to Cart</button>
                    </Link>
                    <Link to="/products">
                      <button onClick={() => closeKnob()}>Go Back</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      }}
    </ProductContext.Consumer>
  );
}
