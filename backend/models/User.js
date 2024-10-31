const pool = require("../config/db");

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
}

async function createUser(email, hashedPassword) {
  await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
    email,
    hashedPassword,
  ]);
}

module.exports = {
  findUserByEmail,
  createUser,
};