const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    stationId: {
      type: String,
      required: true,
    },
    stationName: {
      type: String,
      required: true,
    },
    complaint: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    satisfied: {
      type: Boolean,
      default: null,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("Complaint", complaintSchema);
