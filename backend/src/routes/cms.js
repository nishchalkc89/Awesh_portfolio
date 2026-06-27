const express = require("express");
const requireAuth = require("../middleware/auth");
const CmsData = require("../models/CmsData");
const router = express.Router();

// GET /api/cms/data  — protected
router.get("/data", requireAuth, async (_req, res) => {
  try {
    const doc = await CmsData.findOne({ key: "main" });
    res.json(doc ? doc.data : {});
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch CMS data" });
  }
});

// PUT /api/cms/data  — protected
router.put("/data", requireAuth, async (req, res) => {
  try {
    await CmsData.findOneAndUpdate(
      { key: "main" },
      { $set: { data: req.body } },
      { upsert: true, new: true }
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save CMS data" });
  }
});

module.exports = router;
