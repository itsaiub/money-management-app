import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../store/actions/authActions";

const LogIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const inputHandler = e => {
    return e.target.value;
  };

  const submitHandler = e => {
    e.preventDefault();
    props.loginUser({ email, password }, props.history);
  };

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

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
                      className={
                        error.email ? "form-control is-invalid" : "form-control"
                      }
                      id="inputEmail3"
                      placeholder="email@gmail.com"
                      required=""
                    />
                    {error.email && (
                      <div className="invalid-feedback">{error.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword3">Password</label>
                    <input
                      onChange={e => setPassword(inputHandler(e))}
                      value={password}
                      type="password"
                      className={
                        error.password || error.message
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="inputPassword3"
                      placeholder="password"
                      title="At least 6 characters with letters and numbers"
                      required=""
                    />
                    {error.password && (
                      <div className="invalid-feedback">{error.password}</div>
                    )}
                    {error.message && (
                      <div className="invalid-feedback">
                        {error.message} with the database
                      </div>
                    )}
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

const mapStateToProps = state => {
  return {
    error: state.auth.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginUser: (user, history) => dispatch(login(user, history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogIn);
