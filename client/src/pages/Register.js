import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../store/actions/authActions";

const Register = props => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  const inputHandler = e => {
    return e.target.value;
  };

  const submitHandler = e => {
    e.preventDefault();
    props.registerUser(
      { name, email, password, confirmPassword },
      props.history
    );
    console.log("submitted");
  };

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  console.log(props);

  return (
    <div className="row">
      <div className="col-md-12">
        <h2 className="text-center mb-5">Register here</h2>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="card border-secondary">
              <div className="card-header">
                <h3 className="mb-0 my-2">Sign Up</h3>
              </div>
              <div className="card-body">
                <form className="form" onSubmit={submitHandler}>
                  <div className="form-group">
                    <label htmlFor="inputName">Name</label>
                    <input
                      onChange={e => setName(inputHandler(e))}
                      value={name}
                      type="text"
                      className={
                        error.name ? "form-control is-invalid" : "form-control"
                      }
                      id="inputName"
                      placeholder="Enter your name"
                    />
                    {error.name && (
                      <div className="invalid-feedback">{error.name}</div>
                    )}
                  </div>
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
                        error.password
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputVerify3">Confirm Password</label>
                    <input
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(inputHandler(e))}
                      type="password"
                      className={
                        error.confirmPassword
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      id="inputVerify3"
                      placeholder="password (again)"
                      required=""
                    />
                    {error.confirmPassword && (
                      <div className="invalid-feedback">
                        {error.confirmPassword}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <Link to="/login">Already have account? Login here</Link>
                    <button
                      type="submit"
                      className="btn btn-success btn-lg float-right"
                    >
                      Register
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
    registerUser: user => dispatch(register(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
