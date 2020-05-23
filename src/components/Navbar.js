import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../green.png'

class Navbar extends Component {
  render() {
    return (
      <>
      <Link to='/'>
          <img src={logo} alt='logo' className='logo-brand' />
        </Link>
        <nav className='lightnavbar navbar-expand-sm px-sm-5'>
        <ul className='navbar-nav'>
          <li className='navlinks nav-item ml-5'>
            <Link to='/products' className='nav-link'>
              Products
            </Link>
            <Link to='/findGift' className='style-link nav-link'>
            Find a Gift
            </Link>
            <Link to='/shoppingCart' className='ml-auto'>              
              <img src="commerce-and-shopping_24x24.png" alt="shopping-cart-icon"></img>
            </Link>
          </li>
        </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;