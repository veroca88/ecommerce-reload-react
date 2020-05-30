import React, { Component } from "react";
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
  render() {
    return (
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">
                    Ups! The page you are trying to reach doesn't exist.
                  </h1>
                </div>

                <div className="contant_box_404">
                  <h3 className="total-pur h5">. . . You seem lost!!</h3>

                  {/* <p>..Thank you!</p> */}
                  <div className="btn-center product-price-btn">
                    <Link to="/">
                      <button className="btn btn-lg btn-dark text-uppercase">Go to Home</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default PageNotFound