const express = require('express');
const { getComplaints, createComplaint, updateComplaint, getSummary } = require('../controllers/complaintController');

const router = express.Router();

// Routes for complaints
router.get('/', getComplaints);
router.post('/', createComplaint);
router.put('/:id', updateComplaint);

router.get('/getSummary', getSummary);


module.exports = router;
