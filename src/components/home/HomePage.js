import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";

function HomePage(errors, onChange) {
  return (
    <div className="jumbotron">
      <h1>User Admin Page</h1>
      <p>Please login</p>

      <TextInput
        name="username"
        label="Username"
        onChange={onChange}
        error={errors.username}
      />

      <PasswordInput
        name="password"
        label="Password"
        onChange={onChange}
        error={errors.password}
      />

      <Link to="users" className="btn btn-primary btn-lg">
        Login
      </Link>
    </div>
  );
}

HomePage.propTypes = {
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired
};

export default HomePage;
