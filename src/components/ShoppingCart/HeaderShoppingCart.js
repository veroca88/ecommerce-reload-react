import React from "react";

//CART COLUMNS

export default function HeaderShoppingCart() {
  return (
    <div className="container-fluid text-center d-none d-lg-block">
      <div className="row">
        <div className="col-10 mx-auto col-lg-1">
          <p>Products</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Size</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Color</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Quantity</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Price</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Delete</p>
        </div>
        <div className="col-10 mx-auto col-lg-1">
          <p>Total</p>
        </div>
      </div>
    </div>
  );
}
