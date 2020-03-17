import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { loadUsers, saveUser } from "../../redux/actions/userActions";
import { loadScopes } from "../../redux/actions/scopeActions";
import UserForm from "./UserForm";
import { newUser } from "../../../tools/mockData";
import Spinner from "../common/Spinner";

function ManageUsersPage({
  users,
  scope,
  loadScopes,
  loadUsers,
  saveUser,
  history,
  ...props
}) {
  const [user, setUser] = useState({ ...props.user });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (users.length === 0) {
      loadUsers().catch(error => {
        alert("Loading users failed" + error);
      });
    } else {
      setUser({ ...props.user });
    }

    if (scope.length === 0) {
      loadScopes().catch(error => {
        alert("Loading scope failed" + error);
      });
    }
  }, [props.user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: name === "scopeId" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { username, email, scopeId, password, cPassword } = user;
    const errors = {};

    if (!username) errors.username = "Name is required.";
    if (!email) errors.email = "Email is required.";
    if (!scopeId) errors.scope = "Scope is required.";
    if (!password) errors.password = "Password is required.";
    if (cPassword != password) errors.cPassword = "Passwords do not match.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveUser(user)
      .then(() => {
        toast.success("User saved.");
        history.push("/users");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return scope.length === 0 || users.length === 0 ? (
    <Spinner />
  ) : (
    <UserForm
      user={user}
      errors={errors}
      scope={scope}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageUsersPage.propTypes = {
  user: PropTypes.object.isRequired,
  scope: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadScopes: PropTypes.func.isRequired,
  saveUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getUserBySlug(users, email) {
  return users.find(user => user.email === email) || null;
}

function mapStateToProps(state, ownProps) {
  const email = ownProps.match.params.email;
  const user =
    email && state.users.length > 0
      ? getUserBySlug(state.users, email)
      : newUser;
  return {
    user,
    users: state.users,
    scope: state.scope
  };
}

const mapDispatchToProps = {
  loadUsers,
  saveUser,
  loadScopes
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsersPage);
