const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload
} = require('../controllers/bootcamps');
const Bootcamp = require('../models/Bootcamp');

//pagination aka querying hooks
const advancedResults = require('../middleware/advancedResults');

//Auth valitated methods with tokens
const { protect, authorize } = require('../middleware/auth');


//Include other resource routers to access url path by /bootcamps/5d713995b721c3bb38c1f5d0/courses/
const courseRouter = require('./courses')



const router = express.Router();

// Re-route into other resource routers like courses.js
router.use('/:bootcampId/courses', courseRouter);
// router.use('/:bootcampId/reviews', reviewRouter);


//route to upload a photo 
router
  .route('/:id/photo')
  .put(protect, bootcampPhotoUpload);

//.put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);


//route for finding all the bootcampw within a certain radius
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

//express router grabing routes path from mount routers
//advancedResults(model, populate associated)
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, createBootcamp);
//.post(protect, authorize('publisher', 'admin'), createBootcamp);
// .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, updateBootcamp)
  .delete(protect, deleteBootcamp)
// .put(protect, authorize('publisher', 'admin'), updateBootcamp)
// .delete(protect, authorize('publisher', 'admin'), deleteBootcamp)
// .put(updateBootcamp)
// .delete(deleteBootcamp);

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
