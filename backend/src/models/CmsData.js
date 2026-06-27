const mongoose = require("mongoose");

const cmsDataSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CmsData", cmsDataSchema);
