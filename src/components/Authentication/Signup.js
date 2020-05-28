import React from "react";

import { Redirect } from "react-router-dom";

import { AuthContext } from "../context/Authentication";

function Signup() {
  return (
    <AuthContext.Consumer>
      {context => {
        const {
          formSignup: { username, email, password },
          message,
          isLoggedIn
        } = context.state;

        const { handleSignupInput, handleSignupSubmit } = context;
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
                          <h5 className="card-title text-center">BECOME A MEMBER</h5>
                          <form
                            className="form-signin"
                            id="form"
                            onSubmit={handleSignupSubmit}
                          >
                            <p>
                              Become a Member — you'll enjoy exclusive deals,
                              offers, invites and rewards.
                            </p>
                            <label
                              className="form-label-group"
                              htmlFor="username"
                            >
                              Username:
                              <input
                                className="form-control"
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={handleSignupInput}
                              />
                            </label>
                            <label className="form-label-group" htmlFor="email">
                              Email:
                              <input
                                className="form-control"
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={handleSignupInput}
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
                                onChange={handleSignupInput}
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
                              Signup
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

export default Signup;
