import React, { Component } from "react";
import { ProductContext } from "../context/ProductsProvider";
import { Link } from "react-router-dom";

class DetailsProduct extends Component {
  state = {
    currentProduct: this.props.location.state.props,
  }

  // componentDidMount() {
  //   console.log('---------------', this.props.location.state.props)
  //   const product = this.props.location?.state?.props
  //   ? this.props.location.state.props
  //   : this.state.currentProduct;
  //   this.setState({
  //     currentProduct: product
  //   })
  // }
  render() {
    console.log('PRODUCT', this.state.currentProduct)
    const { currentProduct } = this.state
    return (
      <>
      <section>
        <form onSubmit={console.log('Submited DEtails')} >
          <div className="detail-card">
            <div className="row ">
              <div className="col-md-8">
                <img alt={currentProduct.name} src={currentProduct.image} className="w-100" />
              </div>
              <div className="col-md-4 product-info">
                <h4 className="product-title">{currentProduct.name}</h4>
                <hr />
                <p>
                  Price: <strong className="cost-box">${currentProduct.cost}</strong>
                </p>
                <p>
                  Material :<strong className="material-box">{currentProduct.material}</strong>
                </p>
                <div className="size-box">
                  <select name="size" onChange={this.handleItem}>
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
                  <select name="color" onChange={this.handleItem}>
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
                <div 
                className="product-price-btn"
                // className="box-btns"
                >

                
                {/* <button
                  // className="product-price-btn"
                  disabled={isInShopBag ? true : false}
                  onClick={this.handleItemInBag}
                >
                  {isInShopBag ? <h6 disabled>In Bag</h6> : <h6>Add </h6>}
                </button> */}

                
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
      </>
      
    );
  }
}

export default DetailsProduct;
