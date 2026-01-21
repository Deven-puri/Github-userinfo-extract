
const express = require("express");
const User = require("../Models/Users");
const axios = require("axios");

const router = express.Router();

// POST /github-user
router.post("/github-user", async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    const headers = {
      'User-Agent': 'user-api-app',
      'Accept': 'application/vnd.github.v3+json'
    };
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    }
    const response = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const { name, avatar_url, bio, public_repos } = response.data;
    const user = await User.create({
      name: name || username,
      avatar: avatar_url,
      bio,
      repos: public_repos
    });
    res.status(201).json(user);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      return res.status(403).json({ message: 'GitHub API rate limit exceeded or forbidden. Add a GitHub token to your .env as GITHUB_TOKEN.' });
    }
    res.status(400).json({ message: error.message });
  }
});

// GET /users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /users
router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
