const bcrypt = require("bcryptjs");
const { findUserByEmail, createUser } = require("../models/User");

exports.register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await createUser(email, hashedPassword);
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.userId = user.id;
      res.json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

exports.checkSession = (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true });
  } else {
    res.status(401).json({ loggedIn: false });
  }
};
