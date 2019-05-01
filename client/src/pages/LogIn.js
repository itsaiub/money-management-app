import React, { useState } from "react";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputHandler = e => {
    return e.target.value;
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <h2 className="text-center mb-5">LogIn here</h2>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card border-secondary">
              <div className="card-header">
                <h3 className="mb-0 my-2">Login</h3>
              </div>
              <div className="card-body">
                <form className="form" onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="inputEmail3">Email</label>
                    <input
                      onChange={e => setEmail(inputHandler(e))}
                      value={email}
                      type="email"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="email@gmail.com"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword3">Password</label>
                    <input
                      onChange={e => setPassword(inputHandler(e))}
                      value={password}
                      type="password"
                      className="form-control"
                      id="inputPassword3"
                      placeholder="password"
                      title="At least 6 characters with letters and numbers"
                      required=""
                    />
                  </div>
                  <div className="form-group">
                    <Link to="/register">
                      Don't have account? Register here
                    </Link>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg float-right"
                    >
                      LogIn
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
