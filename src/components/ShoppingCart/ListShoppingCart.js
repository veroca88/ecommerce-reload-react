import React from "react";
import ProductOfCart from "./ProductOfCart";
//Cart list
export default function ListShoppingCart({ value }) {
  const { shoppingCart } = value
  return (
      <div className='container-fluid'>
        {shoppingCart.map((eachItem, index) => {
          return <ProductOfCart key={index} eachProduct={eachItem} value={value} />;
        })}
      </div>
  );
}
