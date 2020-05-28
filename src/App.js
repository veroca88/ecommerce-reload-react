import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Switch, Route } from 'react-router-dom'

import Navbar from './components/Navbar';
import ProductList from './components/ProductList/ProductList';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import DetailsProduct from './components/SingleProduct/DetailsProduct';
import RandomOutfit from './components/RandomOutfit/RandomOutfit';
import PageNotFound from './components/PageNotFound/PageNotFound';
import HomePage from './components/HomePage/HomePage';
import Modal from './components/Modal/Modal';
import SignIn from './components/Authentication/Signup';
import LogIn from './components/Authentication/Login';
import Profile from './components/User/Profile'

function App() {
  return (
    <>
    <Navbar />
    <Switch>
    <Route exact path='/' component={HomePage} />
    <Route exact path='/signup' component={SignIn} />
    <Route exact path='/login' component={LogIn} />
    <Route exact path='/profile' component={Profile} />
      <Route path='/findGift' component={RandomOutfit} />
      <Route path='/products' component={ProductList} />
      <Route path='/details/:productId' component={DetailsProduct} />
      <Route path='/ShoppingCart' component={ShoppingCart} />
      <Route component={PageNotFound} />
    </Switch>
    <Modal />
    </>
   

  );
}

export default App;
