import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import PasswordInput from "../common/PasswordInput";
import { Link } from "react-router-dom";

const LoginForm = ({
  user,
  onLogin,
  onChange,
  loggingIn = false,
  errors = {}
}) => {
  return (
    <div className="jumbotron">
      <h2>User Admin Page</h2>
      <p>Please login</p>
      <form onSubmit={onLogin}>
        {errors.onLogin && (
          <div className="alert alert-danger" role="alert">
            {errors.onLogin}
          </div>
        )}
        <TextInput
          name="email"
          label="Email"
          value={user.email}
          onChange={onChange}
          error={errors.email}
        />

        <PasswordInput
          name="password"
          label="Password"
          value={user.password}
          onChange={onChange}
          error={errors.password}
        />
        <div className="btn-group">
          <button
            type="submit"
            disabled={loggingIn}
            className="btn btn-primary btn-lg"
          >
            {loggingIn ? "Verifying..." : "Login"}
          </button>
          <Link to="user" className="btn btn-secondary btn-lg">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  user: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
  errors: PropTypes.object
};

export default LoginForm;
