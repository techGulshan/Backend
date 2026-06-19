const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Color", colorSchema);