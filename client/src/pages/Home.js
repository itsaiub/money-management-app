import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/actions/authActions";

const Home = props => {
  return (
    <div>
      <h1>Home</h1>
      {props.authenticated ? (
        <button
          onClick={() => props.logout(props.history)}
          className="btn btn-danger"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="btn btn-success">Log In</button>
        </Link>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    authenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: history => dispatch(logout(history))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
