const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });

  const adminPassword = process.env.ADMIN_PASSWORD || "awesh2025admin";
  const valid = password === adminPassword;
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.json({ ok: true, token });
});

// POST /api/auth/logout  (client just discards the token)
router.post("/logout", (_req, res) => {
  res.json({ ok: true });
});

module.exports = router;
