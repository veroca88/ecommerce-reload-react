
import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
  baseURL,
  withCredentials: true
});

const AUTH_SERVICE = {
  // userData is a placeholder (represents the user's inputs in the signup and login form)
  signup(userData) {
    console.log('.........', process.env )
    // const { username, email, password } = req.body; <===> userData
    return service.post('/api/signup', userData);
  },
  
  login(userData) {

    // passport.authenticate('local'),
    console.log('user data in the service: ', baseURL)
    return service.post(`${baseURL}api/login`, userData);
  },
  
  logout() {

    return service.post(`${baseURL}api/logout`, {});
  },
  
  getUser() {
    console.log('getuser data in the service: ');
    return service.get(`${baseURL}api/isLoggedIn`);
  },

  updateProfile(userData) {
    console.log({userData})
    return service.post(`${baseURL}api/profile/upload`, userData);
  }

};

export default AUTH_SERVICE;