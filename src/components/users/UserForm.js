import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";
import PasswordInput from "../common/PasswordInput";

const UserForm = ({
  user,
  scope,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{user.id ? "Edit" : "Add"} User</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="username"
        label="Username"
        value={user.username}
        onChange={onChange}
        error={errors.username}
      />

      <TextInput
        name="email"
        label="Email"
        value={user.email}
        onChange={onChange}
        error={errors.email}
      />

      <SelectInput
        name="scopeId"
        label="Scope"
        value={user.scopeId || ""}
        defaultOption="Select Scope"
        options={scope.map(scope => ({
          value: scope.id,
          text: scope.name
        }))}
        onChange={onChange}
        error={errors.scope}
      />

      <PasswordInput
        name="password"
        label="Password"
        value={user.password}
        onChange={onChange}
        error={errors.password}
      />

      <PasswordInput
        name="cPassword"
        label="Confirm Password"
        value={user.cPassword}
        onChange={onChange}
        error={errors.cPassword}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  scope: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default UserForm;
