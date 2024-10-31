const express = require("express");
const session = require("express-session");
const sessionConfig = require("./config/sessionConfig");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const path = require("path");

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session(sessionConfig));

app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendBuildPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendBuildPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello, World!");
  });
}

module.exports = app;
