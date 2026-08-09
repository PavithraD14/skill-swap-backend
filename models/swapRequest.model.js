const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    skillId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skills",
      required: true,
    },

    skillOffered: {
      type: String,
      required: true,
    },

    skillWanted: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },

    reviewComment: {
      type: String,
      default: "",
    },

    reviewed: {
      type: Boolean,
      default: false,
    },


reviewerId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "users",
  default: null,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("SwapRequest", swapRequestSchema);