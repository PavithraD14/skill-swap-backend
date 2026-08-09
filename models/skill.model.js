const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    skillName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    exchangeSkill: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["offered", "wanted"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("skills", skillSchema);