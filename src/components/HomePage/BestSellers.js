import React, { Component } from 'react';
import {Link} from "react-router-dom"

class BestSellers extends Component {
  render() {
    return (
      <div>
        <Link to="/products">
  <div className="gallery-wrap">
    <div className="item item-1"></div>
    <div className="item item-2"></div>
    <div className="item item-3"></div>
    <div className="item item-4"></div>
    <div className="item item-5"></div>
  </div>
</Link>
      </div>
    );
  }
}

export default BestSellers; 