import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../green.png'
import { ProductContext } from './context/ProductsProvider';
import { AuthContext } from './context/Authentication'

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
            <div className='style-link ml-auto'>
              <AuthContext.Consumer>
                {context => {
                  const { isLoggedIn } = context.state;
                  return (
                    <>
                    {isLoggedIn ? (
                      <>
                      <Link to="/"
                      className="link-navbar"
                      onClick={context.handleLogout}
                    >
                      Logout
                    </Link>
                    <Link className="link-navbar" to="/profile">
                      My account{" "}
                    </Link>
                    </>
                    ) : (
                      <div className="dropdown">
                      <Link to="/signup" className='style-link ml-auto nav-link'>
                        Sign In
                      </Link>
                      <div className="dropdown-content">
                        <Link className="nav-link link-navbar" to="/login">
                          Login
                        </Link>
                        <Link className="nav-link link-navbar" to="/login">
                          {" "}
                          My account{" "}
                        </Link>
                        <Link
                          className="small-notification nav-link link-navbar"
                          to="/signup"
                        >
                          Not a member yet? <i>Join here</i>
                        </Link>
                      </div>
                    </div>

                    )}
                    </>
                  )
                }}
              </AuthContext.Consumer>
            
            <Link to='/shoppingCart' className='style-link' >  
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

            </div>
          </li>
        </ul>
        </nav>
      </>
    );
  }
}

export default Navbar;