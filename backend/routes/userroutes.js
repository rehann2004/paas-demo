const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a user
router.post('/register', async (req, res) => {
  const { username, password, courses } = req.body;
  try {
    const user = new User({ username, password, courses });
    await user.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/all', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
