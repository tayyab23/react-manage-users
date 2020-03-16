import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  validateUser,
  validateClientSession,
  initSession
} from "../../redux/actions/loginActions";
import LoginForm from "./LoginForm";
import { newUser, newSession } from "../../../tools/mockData";

function HomePage({
  validateUser,
  initSession,
  validateClientSession,
  history,
  ...props
}) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [session, setSession] = useState({ ...props.session });
  const [sessionIsValid, setSessionIsValid] = useState(false);
  const [expiredSession, setExpiredSession] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    if (session != null && session.id != null) {
      setSessionIsValid(validateClientSession(session));
      setExpiredSession(
        session.expiresEpoch < Math.round(new Date().getTime() / 1000)
      );
      setLoggingIn(false);
    }
  }, [session]);

  function formIsValid() {
    const { username, password } = user;
    const errors = {};

    if (!username) errors.username = "Username / Email is required.";
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
          // deleteOldSession(session);
          initSession(session);
          history.push("/");
          toast.success("Welcome");
        }
      })
      .catch(error => {
        setErrors({ onLogin: error.message });
      });
    setLoggingIn(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  return !expiredSession && sessionIsValid ? (
    <div className="jumbotron">
      <h2>Welcome, currently logged in as {user.username}</h2>
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
  validateClientSession: PropTypes.func,
  errors: PropTypes.object,
  history: PropTypes.object.isRequired
};

function mapStateToProps() {
  const user = newUser;
  const session = newSession;
  return {
    user,
    session
  };
}

const mapDispatchToProps = {
  validateUser,
  initSession,
  validateClientSession
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
