import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  validateUser,
  initSession,
  deleteSession
} from "../../redux/actions/loginActions";
import LoginForm from "./LoginForm";
import { newUser } from "../../../tools/mockData";
import { Link } from "react-router-dom";

function HomePage({
  validateUser,
  initSession,
  deleteSession,
  history,
  ...props
}) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [expiredSession, setExpiredSession] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (props.session != null && props.session.id != null) {
      setExpiredSession(
        props.session.expiresEpoch < Math.round(new Date().getTime() / 1000)
      );
      setLoggingIn(false);
    }
    if (
      props.session !== null &&
      props.session.expiresEpoch < Math.round(new Date().getTime() / 1000)
    ) {
      deleteSession({ ...props.session });
    }
  }, [props.session]);

  function formIsValid() {
    const { email, password } = user;
    const errors = {};

    if (!email) errors.email = "Email is required.";
    if (!password) errors.password = "Password is required.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setLoggingIn(true);
    validateUser(user)
      .then(session => {
        if (session == undefined) {
          toast.error("Invalid Credentials");
        } else {
          initSession(session);
          history.push("/");
          toast.success("Welcome");
        }
        setLoggingIn(false);
      })
      .catch(error => {
        setErrors({ onLogin: error.message });
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handleLogout() {
    setExpiredSession(true);
    deleteSession({ ...props.session });
  }

  return !expiredSession ? (
    <div className="jumbotron">
      <h2>Welcome, currently logged in as {props.session.loggedInAs}</h2>
      <Link href="/" onClick={handleLogout} className="btn btn-primary btn-md">
        Logout
      </Link>
    </div>
  ) : (
    <LoginForm
      user={user}
      onLogin={handleLogin}
      onChange={handleChange}
      loggingIn={loggingIn}
      errors={errors}
    />
  );
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  validateUser: PropTypes.func.isRequired,
  initSession: PropTypes.func.isRequired,
  deleteSession: PropTypes.func,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const user = newUser;
  const session = state.session;
  return {
    user,
    session
  };
}

const mapDispatchToProps = {
  validateUser,
  initSession,
  deleteSession
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
