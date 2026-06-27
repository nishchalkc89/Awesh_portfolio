const express = require("express");
const requireAuth = require("../middleware/auth");
const Contact = require("../models/Contact");
const router = express.Router();

// POST /api/contact  — public
router.post("/", async (req, res) => {
  const { name, email, subject, budget, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await Contact.create({ name, email, subject, budget, message });
    res.json({ ok: true, message: "Message received!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save contact" });
  }
});

// GET /api/contact  — protected (admin)
router.get("/", requireAuth, async (_req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// PATCH /api/contact/:id/read  — protected
router.patch("/:id/read", requireAuth, async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: "Failed to update contact" });
  }
});

module.exports = router;
