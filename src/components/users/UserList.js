import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const UserList = ({ users, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Username</th>
        <th>Email</th>
        <th>Scope</th>
        <th>Password</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {users.map(user => {
        return (
          <tr key={user.id}>
            <td>
              <Link to={"/user/" + user.email}>{user.username}</Link>
            </td>
            <td>{user.email}</td>
            <td>{user.scopeName}</td>
            <td>{"*".repeat(user.password.length)}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(user)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default UserList;
