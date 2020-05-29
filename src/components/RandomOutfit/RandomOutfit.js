import React, { Component } from 'react';
import { ProductContext } from '../context/ProductsProvider';
import { Link } from 'react-router-dom';

class DailyInspiration extends Component {
    randomCard = (products) => {
        const randomNumber = Math.floor(Math.random() * products.length);
        let dailyProduct = products[randomNumber];
        return (
          <section className="container-fluid">
            <div className="image-box">
              <div className="row ">
                <div className="col-md-8">
                  <img
                    alt={dailyProduct?.name}
                    src={dailyProduct?.image}
                    className="w-100"
                  />
                </div>
                <div className="col-md-4 product-info">
                  <div className="product-title">
                    <h1>{dailyProduct?.name}</h1>
                    <h2>by AWARE</h2>
                    <p>
                    “You cannot protect the environment unless you 
                    empower people, you inform them, and you help 
                    them understand that these resources are their 
                    own, that they must protect them.”                 
                    </p>
                  </div>
                    <Link to="/products">
                      <button className="btn btn-sm btn-dark text-uppercase" type="button">See on Products</button>
                    </Link>
                </div>
              </div>
            </div>
          </section>
        );
      };
    render() {
        return (
            <>
            <ProductContext.Consumer>
                {context => {
                    const { productsList } = context;
                    return (
                        <>
                        {this.randomCard(productsList)}
                        </>
                    )
                }}
            </ProductContext.Consumer>
            </>
            
        );
    }
}

export default DailyInspiration;