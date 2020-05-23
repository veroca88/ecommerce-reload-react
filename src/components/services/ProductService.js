import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const PRODUCT_SERVICE = {
  // productData is a placeholder (represents the product's inputs in the signup and login form)
  getAddedItem(productData) {
    // const { productname, email, password } = req.body; <===> productData
    console.log('product data in the service: ', productData);
    return service.post('/api/product/add-product', productData);
  },

  getProducts(productData) {
    return service.get('/products', productData)
  }


};

export default PRODUCT_SERVICE;