import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProductProvider from './components/context/ProductsProvider';
import AuthProvider from './components/context/Authentication';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
  <AuthProvider>
  <ProductProvider>
    <App />
  </ProductProvider>
  </AuthProvider>
  </BrowserRouter>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
