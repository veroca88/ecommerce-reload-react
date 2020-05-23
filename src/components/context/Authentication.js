import React from 'react';

import { withRouter } from 'react-router-dom';

import AUTH_SERVICE from '../services/AuthService';

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    formSignup: {
      username: '',
      email: '',
      password: ''
    },
    formLogin: {
      email: '',
      password: ''
    },
    currentUser: {},
    isLoggedIn: false,
    message: null,
  };

  componentDidMount() {
    AUTH_SERVICE.getUser()
      .then(responseFromServer => {
        
        const { user } = responseFromServer.data;
        // here i see the user
        console.log('Authentication.js, LINE31 Response from db: ', responseFromServer.data);

        this.setState(prevState => ({
          ...prevState,
          currentUser: user,
          isLoggedIn: true
        }));
        console.log('Authentication.js, LINE38 User is loggedIN?: ', this.state.isLoggedIn);
        console.log('Authentication.js, LINE41 User : ', this.state.currentUser);
      })
      .catch(err =>
        console.log('Error while getting the user: ', err)
      );
  }
////////////////////////////// SIGNUP
  handleSignupInput = e => {
    const { target: { name, value }} = e;
    this.setState(prevState => ({
      ...prevState,
      formSignup: {
        ...prevState.formSignup,
        [name]: value
      }
    }));
  };
////////////////////////////// SIGNUP

handleSignupSubmit = e => {
  e.preventDefault(); 
  AUTH_SERVICE.signup(this.state.formSignup)
    .then(responseFromServer => {
      const {
        data: { user, message }
      } = responseFromServer;

      this.setState(prevState => ({
        ...prevState,
        formSignup: {
          username: '',
          email: '',
          designer: ''
        },          
        currentUser: user,
        isLoggedIn: true
      }));
      console.log(`${message}`);
      this.props.history.push('/');
    })
    .catch(err => {
      // console.log(err.response);
      if (err.response && err.response.data) {
        this.setState(prevState => ({
          ...prevState,
          message: err.response.data.message
        }));
      }
    });
};

//========================== LOGIN
  handleLoginInput = e => {
    const {
      target: { name, value }
    } = e;
    this.setState(prevState => ({
      ...prevState,
      formLogin: {
        ...prevState.formLogin,
        [name]: value
      }
    }));
  };

//========================== LOGIN  
  handleLoginSubmit = e => {
    e.preventDefault();
    AUTH_SERVICE.login(this.state.formLogin)
    .then(responseFromServer => {
    if (this.state.formLogin.username === this.state.formSignup.username) {
      return (this.state.formLogin.username)
    }
        console.log('LOGIN res from server: ', responseFromServer);
        const {
          data: { user, message }
        } = responseFromServer;

        this.setState(prevState => ({
          ...prevState,
          formLogin: {
            email: '',
            password: ''
          },
          currentUser: user,
          isLoggedIn: true
        }));
        console.log(`${message}`);
        this.props.history.push('/');
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.data) {
          this.setState(prevState => ({
            ...prevState,
            message: err.response.data.message
          }));
        }
      });
  };


//+++++++++++++++++++++++ UPDATE INPUT PROFILE
handleUpdateInput = e => {
  const { target: { name, value }} = e;
  this.setState(prevState => ({
    ...prevState,
    currentUser:{
      [name]: value
    }
  }));
};

//+++++++++++++++++++++++ UPDATE INPUT PROFILE

  handleUpdateData = e => {
    e.preventDefault();
    AUTH_SERVICE.updateProfile(this.state.currentUser)
    .then(responseFromServer => {
            const {
          data: { user, message }
        } = responseFromServer;

        this.setState(prevState => ({
          ...prevState,
          currentUser: user,
          isLoggedIn: true
        }));
        console.log(`${message}`);
        this.props.history.push('/');
      })
      .catch(err => {
        // console.log(err.response);
        if (err.response && err.response.data) {
          this.setState(prevState => ({
            ...prevState,
            message: err.response.data.message
          }));
        }
      });
  };
//------------------------ LOGOUT
  handleLogout = () => {
    AUTH_SERVICE.logout()
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          currentUser: {},
          isLoggedIn: false
        }));
        this.props.history.push('/');
      })
      .catch(err => console.log('Error while logout: ', err));
  };


  // this wil handle changing of true and false value for a checkbox since you have to check the event.target.checked option for true or false. If we just check the event.target.value we will get a value of "on" or "off".
  handleCheckboxChange = (event) => {
    const { target: {name, checked } }= event;

    this.setState({ 
      currentUser: {
        [name]: checked 
      }});
  };


  render() {
    const { state, handleSignupInput, handleSignupSubmit, handleLogout, handleLoginInput, handleLoginSubmit, handleUpdateInput, handleUpdateData, handleCheckboxChange } = this;
    return (
      <>
        <AuthContext.Provider
          value={{
            state,
            handleSignupInput,
            handleSignupSubmit,
            handleLoginInput,
            handleLoginSubmit,
            handleUpdateData,
            handleUpdateInput,
            handleLogout,
            handleCheckboxChange
          }}
        >
          {this.props.children}
        </AuthContext.Provider>
      </>
    );
  }
}

export default withRouter(AuthProvider);