import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../common/Navbar";
import PropTypes from "prop-types";

function Header({ ...props }) {
  const [sessionExpired, setSessionExpired] = useState(true);

  useEffect(() => {
    if (props.session != null && props.session.id != null) {
      setSessionExpired(
        props.session.expiresEpoch < Math.round(new Date().getTime() / 1000)
      );
    } else {
      setSessionExpired(true);
    }
  }, [props.session]);

  return <Navbar sessionExpired={sessionExpired} />;
}

Header.propTypes = {
  session: PropTypes.object.isRequired,
  sessionExpired: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  const session = state.session;
  return {
    session
  };
}

export default connect(mapStateToProps)(Header);
