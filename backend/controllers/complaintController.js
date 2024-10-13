const Complaint = require("../models/complaintModel");

// Get all complaints
const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new complaint
const createComplaint = async (req, res) => {
  // const { name, complaint } = req.body;
  const data = req.body;
  // console.log(data);
  try {
    const newComplaint = new Complaint(data);
    await newComplaint.save();
    res.status(201).json(newComplaint);
    
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update complaint status
const updateComplaint = async (req, res) => {
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

const getSummary = async (req, res) => {
  try {
    const complaints = await Complaint.aggregate( 
      [
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        }
      ]
    );
    res.status(200).json(complaints);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getComplaints, createComplaint, updateComplaint, getSummary };
