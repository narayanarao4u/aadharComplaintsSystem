const Complaint = require("../models/complaintModel");
const Station = require("../models/stationmodel");

// Get all complaints
exports.getComplaints = async (req, res) => {
  try {
    let complaints;

    if (req.params.id) {
      const query = { _id: req.params.id };
      complaints = await Complaint.findOne(query);
    } else {
      complaints = await Complaint.find({}).sort({ complaintID: -1 }) ;
    }

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Station Data
exports.getStationData = async (req, res) => {
  try {
    let complaints;

    if (req.params.id) {
      const query = { _id: req.params.id };
      complaints = await Station.findOne(query);
    } else {
      complaints = await Station.find();
    }

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new complaint
exports.createComplaint = async (req, res) => {
  // const { name, complaint } = req.body;
  const data = req.body;
  // console.log(data);
  try {
    const maxID = await Complaint.aggregate([
      { $group: { _id: null, maxID: { $max: "$complaintID" } } },
    ]);

    const complaintID = maxID.length > 0 ? maxID[0].maxID + 1 : 1;

    // console.log(complaintID);

    data.complaintID = complaintID;

    const newComplaint = new Complaint(data);

    await newComplaint.save();
    res.status(201).json(newComplaint);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: "Server error" });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  console.log('Updating complaint status');
  
  const { id } = req.params;
  const { status } = req.body;

  try {
    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();
    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateComplaint = async (req, res) => {
  console.log("Updating complaint");
  
  const { id } = req.params;
  const data = req.body;

  delete data._id;

  try {
    const complaint = await Complaint.updateOne({ _id: id }, data).then(() =>
      Complaint.findById(id)
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.status(200).json(complaint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getSummary = async (req, res) => {
  try {
    const complaints = await Complaint.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports = { getComplaints, createComplaint, updateComplaint, getSummary, getStationData };
