const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const pool = require("./db");

const sessionConfig = {
  store: new pgSession({
    pool: pool,
    tableName: "session",
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

module.exports = sessionConfig;
