const express = require('express');
const { getBootcamp, getBootcamps, createBootcamp, updateBootcamp, deleteBootcamp} = require('../controllers/bootcamps')
const router = express.Router();
const Bootcamp = require('../models/Bootcamp')

//express router grabing routes path from mount routers
router
  .route('/')
  .get(getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);



module.exports = router;








// this in server.js app.use('/api/v1/bootcamps', bootcamps) means the path can be deleted here

// router.get('/api/v1/bootcamps', (req, res) => {
//   res.status(200).json({ success: true, msg: 'show all bootcamps' });
// })

// router.get('/api/v1/bootcamps/:id', (req, res) => {
//   res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
// });


// router.post('/api/v1/bootcamps', (req, res) => {
//   res.status(200).json({ success: true, msg: 'create new bootcamp' });
// });

// router.put('/api/v1/bootcamps/:id', (req, res) => {
//   res.status(200).json({ success: true, msg: `updated bootcamp ${req.params.id}` });
// });

// router.delete('/api/v1/bootcamps/:id', (req, res) => {
//   res.status(200).json({ success: true, msg: `delete bootcamp ${req.params.id}` });
// });

