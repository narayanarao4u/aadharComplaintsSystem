const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    StationId: {
      type: Number,
      required: true,
    },
    AEK_LOCATION: {
      type: String,
      required: true,
    }
   
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("station", stationSchema);