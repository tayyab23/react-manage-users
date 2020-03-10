const users = [
  {
    id: 1,
    username: "test1.123",
    email: "test1.123@hotmail.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 2,
    username: "tayyab.ahmed",
    email: "tayyab@ahmed.com",
    scopeId: 1,
    password: "password123"
  },
  {
    id: 3,
    username: "simon.laalo",
    email: "simon@laalo.com",
    scopeId: 1,
    password: "password123"
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
    username: "luke.evans",
    email: "luke@evans.com",
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

const newUser = {
  id: null,
  username: "",
  scopeId: null,
  password: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newUser,
  users,
  scope
};
