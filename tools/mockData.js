const users = [
  {
    id: 1,
    username: "Administrator",
    email: "admin@admin.com",
    scopeId: 1,
    password: "admin0"
  },
  {
    id: 2,
    username: "Power User",
    email: "power@power.com",
    scopeId: 2,
    password: "power0"
  },
  {
    id: 3,
    username: "User",
    email: "user@user.com",
    scopeId: 3,
    password: "user0"
  },
  {
    id: 4,
    username: "Adrien",
    email: "adrien@calabrio.com",
    scopeId: 3,
    password: "password123"
  },
  {
    id: 5,
    username: "Simona Hera",
    email: "simona@hera.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 6,
    username: "Tayyab Ahmed",
    email: "tayyab@ahmed.com",
    scopeId: 2,
    password: "password123"
  },
  {
    id: 7,
    username: "Hello WoRlD",
    email: "hello@world.com",
    scopeId: 3,
    password: "password123"
  },
  {
    id: 8,
    username: "Simon Laalo",
    email: "simon@laalo.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 9,
    username: "Sally",
    email: "sally@calabrio.com",
    scopeId: 2,
    password: "password123"
  },
  {
    id: 10,
    username: "Calabrio Canada",
    email: "canada@calabrio.com",
    scopeId: 3,
    password: "password123"
  }
];

const scope = [
  { id: 1, name: "administrator" },
  { id: 2, name: "power" },
  { id: 3, name: "user" }
];

const sessions = [
  { id: 0, string: "aSessionString", scopeId: 1, expiresEpoch: 0 }
];

const newUser = {
  id: null,
  username: "",
  email: "",
  scopeId: null,
  password: ""
};

const newSession = {
  id: null,
  string: "",
  scopeId: null,
  loggedInAs: "",
  expiresEpoch: null
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newUser,
  newSession,
  users,
  scope,
  sessions
};
