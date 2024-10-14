const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, "your_jwt_secret", { expiresIn: "1h" }); // Change 'your_jwt_secret' to your secret key
};

// @route POST /auth/signup
// @desc Register a new user
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({ username, password });
    await user.save();

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route POST /auth/login
// @desc Login user and get token
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route GET /auth/user
// @desc Get logged in user's info using token
router.get("/user", async (req, res) => {
  const token = req.header("Authorization");

  if (token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    console.log("67:", !token, token);
    const decoded = jwt.verify(token, "your_jwt_secret");
    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
});

module.exports = router;
