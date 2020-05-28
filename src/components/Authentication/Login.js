import React from "react";

import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/Authentication";

function Login() {
  return (
    <AuthContext.Consumer>
      {context => {
        const {
            formLogin: { email, password },
            message,
            isLoggedIn
        } = context.state;

        const { handleLoginInput, handleLoginSubmit } = context;
        return (
          <>
            {isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              <>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                      <div className="card card-signin my-5">
                        <div className="card-body">
                          <h5 className="card-title text-center">Welcome Back</h5>
                          <form
                            className="form-login"
                            id="form"
                            onSubmit={handleLoginSubmit}
                          >
                            {/* <p>
                              Become a Member — you'll enjoy exclusive deals,
                              offers, invites and rewards.
                            </p> */}
                            <label
                              className="form-label-group"
                              htmlFor="email"
                            >
                              email:
                              <input
                                className="form-control"
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={handleLoginInput}
                              />
                            </label>
                            <label
                              className="form-label-group"
                              htmlFor="password"
                            >
                              Password:
                              <input
                                className="form-control"
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={handleLoginInput}
                              />
                            </label>
                            <hr className="my-4" />
                            {message && (
                              <div className="error-message">{message}</div>
                            )}
                            <button
                              className="btn btn-lg btn-dark text-uppercase"
                              type="submit"
                              >
                              LogIn
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Login;
