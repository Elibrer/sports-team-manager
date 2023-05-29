const { User } = require('../models');

const userData = [
  {
    username: "West Sydney",
    email: "westsydney@stm.com",
    password: "westsyd123",
    is_admin: false
  },
  {
    username: "Macquarie Park",
    email: "macpark@stm.com",
    password: "macpark123",
    is_admin: false
  },
  {
    username: "Randwick",
    email: "randwick@stm.com",
    password: "randwick123",
    is_admin: false
  },
  {
    username: "Miranda",
    email: "miranda@stm.com",
    password: "miranda123",
    is_admin: false
  },
  {
    username: "admin",
    email: "admin@admin.com",
    password: "admin12345",
    is_admin: true
  }
];

const seedUser = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUser;