const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    contact: { type: String },
    email: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", messageSchema);
