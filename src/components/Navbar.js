import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../green.png'
import { ProductContext } from './context/ProductsProvider';

class Navbar extends Component {
  render() {
    return (
      <>
      <Link to='/'>
          <img src={logo} alt='logo' className='logo-brand' />
        </Link>
        <Link to='/' className='style-link logo-brand'>Aware</Link>
        <nav className='lightnavbar navbar-expand-sm px-sm-5'>
        <ul className='navbar-nav'>
          <li className='navlinks nav-item ml-5'>
            <Link to='/products' className='style-link nav-link'>
              Products
            </Link>
            <Link to='/findGift' className='style-link nav-link'>
            Find a Gift
            </Link>
            <Link to='/shoppingCart' className='style-link ml-auto'>  
            <ProductContext.Consumer>
              {context => {
                const { shoppingCart } = context;
                return (
                  <div className='shopping-cart-img-number'>
                  <i className="fas fa-shopping-basket"></i>
                <p>({shoppingCart.length})</p>
                </div>
                  )
              }}
              </ProductContext.Consumer>            
            </Link>
          </li>
        </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;