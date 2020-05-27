import React from "react";
import { Link } from "react-router-dom";

export default function FooterShoppingCart({ value }) {
  const { subTotal, tax, total, clearList } = value;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-right">
            <Link to="/">
              <button
                className="btn btn-outline-danger mb-3 px-5"
                type="button"
                onClick={() => {
                  clearList();
                }}
              >
                Clear Cart
              </button>
            </Link>
            <h5>
              <span>SubTotal:</span>
              <strong>$ {subTotal}</strong>
            </h5>
            <h5>
              <span>Tax:</span>
              <strong>$ {tax}</strong>
            </h5>
            <h5>
              <span>Total:</span>
              <strong>$ {total}</strong>
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
