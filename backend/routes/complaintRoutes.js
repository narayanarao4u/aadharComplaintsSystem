const express = require('express');
const r = require('../controllers/complaintController');

const router = express.Router();

// Routes for complaints
router.get('/', r.getComplaints);
router.get('/stationData', r.getStationData);
router.get('/getSummary', r.getSummary);
router.get('/:id', r.getComplaints);
router.post('/', r.createComplaint);
router.put('/:id', r.updateComplaint);



module.exports = router;
