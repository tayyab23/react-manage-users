const users = [
  {
    id: 1,
    username: "admin",
    email: "admin@admin.com",
    scopeId: 1,
    password: "admin0"
  },
  {
    id: 2,
    username: "power",
    email: "power@power.com",
    scopeId: 2,
    password: "power0"
  },
  {
    id: 3,
    username: "user",
    email: "user@user.com",
    scopeId: 3,
    password: "user0"
  },
  {
    id: 4,
    username: "adrien.poirson",
    email: "adrien@poirson.com",
    scopeId: 3,
    password: "password123"
  },
  {
    id: 5,
    username: "simona.hera",
    email: "simona@hera.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 6,
    username: "tayyab.ahmed",
    email: "tayyab@ahmed.com",
    scopeId: 2,
    password: "password123"
  },
  {
    id: 7,
    username: "hello.world",
    email: "hello@world.com",
    scopeId: 3,
    password: "password123"
  },
  {
    id: 8,
    username: "alex.d",
    email: "alex@alex.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 9,
    username: "sally.k",
    email: "sally@calabrio.com",
    scopeId: 2,
    password: "password123"
  },
  {
    id: 10,
    username: "canada.calabrio",
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
