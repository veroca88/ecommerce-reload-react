import React from "react";
import { AuthContext } from "../context/Authentication";

function Login() {
  return (
    <AuthContext.Consumer>
      {context => {
        const {
          currentUser: {username, email},
          message
        } = context.state;

        const { handleUpdateData, handleUpdateInput } = context;
        return (
          <>
                <div className="container-fluid">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card card-signin my-5">
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      Welcome Back! {username}
                    </h5>
                    <form
                      className="form-signin"
                      id="form"
                      onSubmit={handleUpdateData}
                    >
                      <p>Edit your profile</p>
                      <label className="col-sm-2 col-form-label col-form-label-sm" htmlFor="username">
                        Username:
                        <input
                          className="form-control form-control-sm"
                          id="username"
                          name="username"
                          type="text"
                          value={username}
                          onChange={handleUpdateInput}
                        />
                      </label>
                      <label className="col-sm-2 col-form-label col-form-label-sm" htmlFor="email">
                        Email:
                        <input
                          className="form-control form-control-sm"
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={handleUpdateInput}
                        />
                      </label>
                      <label className="col-sm-2 col-form-label col-form-label-sm" htmlFor="email">
                        Your wishlist (Coming Soon)
                        </label>
                      <hr className="my-4" />
                      {message && (
                        <div className="error-message">{message}</div>
                      )}
                      <div>
                      <button
                        className="btn btn-lg btn-dark text-uppercase"
                        type="submit"
                      >
                        Update
                      </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
              </>
        );
      }}
    </AuthContext.Consumer>
  );
}

export default Login;
