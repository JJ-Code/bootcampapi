const express = require('express');
const router = express.Router();

router.get('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'show all bootcamps' });
})

router.get('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
});


router.post('/api/v1/bootcamps', (req, res) => {
  res.status(200).json({ success: true, msg: 'create new bootcamp' });
});

router.put('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `updage bootcamp ${req.params.id}` });
});

router.delete('/api/v1/bootcamps/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `delete bootcamp ${req.params.id}` });
});

