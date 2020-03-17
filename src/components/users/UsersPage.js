import React from "react";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions";
import * as scopeActions from "../../redux/actions/scopeActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import UserList from "./UserList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class UsersPage extends React.Component {
  state = {
    redirectToAddUserPage: false
  };

  componentDidMount() {
    const { users, scope, actions } = this.props;

    if (users.length === 0) {
      actions.loadUsers().catch(error => {
        alert("Loading users failed" + error);
      });
    }

    if (scope.length === 0) {
      actions.loadScopes().catch(error => {
        alert("Loading scope failed" + error);
      });
    }
  }

  sessionIsValid(session) {
    console.log(session);
    if (session != null || session != undefined) {
      return session.expiresEpoch > Math.round(new Date().getTime() / 1000);
    } else {
      return false;
    }
  }
  handleDeleteUser = async user => {
    toast.success("User Deleted");
    try {
      await this.props.actions.deleteUser(user);
    } catch (error) {
      toast.error("Delete failed." + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {(this.state.redirectToAddUserPage ||
          !this.sessionIsValid(this.props.session)) && <Redirect to="/user" />}
        <h2>Users</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-user"
              onClick={() => this.setState({ redirectToAddUserPage: true })}
            >
              Add User
            </button>

            <UserList
              onDeleteClick={this.handleDeleteUser}
              users={this.props.users}
            />
          </>
        )}
      </>
    );
  }
}

UsersPage.propTypes = {
  scope: PropTypes.array.scope,
  users: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  session: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    users:
      state.scope.length === 0
        ? []
        : state.users.map(user => {
            return {
              ...user,
              scopeName: state.scope.find(a => a.id === user.scopeId).name
            };
          }),
    scope: state.scope,
    session: state.session,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadUsers: bindActionCreators(userActions.loadUsers, dispatch),
      loadScopes: bindActionCreators(scopeActions.loadScopes, dispatch),
      deleteUser: bindActionCreators(userActions.deleteUser, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
