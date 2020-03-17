import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Navbar = ({ sessionExpired = true }) => {
  const activeStyle = { color: "#F15B2A" };

  return (
    <nav>
      <NavLink to="/" activeStyle={activeStyle} exact>
        {sessionExpired ? "Login" : "Home"}
      </NavLink>
      {" | "}
      <NavLink to="/users" activeStyle={activeStyle}>
        {sessionExpired ? "Create User" : "Users"}
      </NavLink>
      {" | "}
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

Navbar.propTypes = {
  sessionExpired: PropTypes.bool.isRequired
};

export default Navbar;
