const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');
const Course = require('../models/Course');
const advancedResults = require('../middleware/advancedResults');

//Auth valitated methods with tokens
const { protect, authorize } = require('../middleware/auth');

// mergeParams allows this to happen bootcamps/5d713995b721c3bb38c1f5d0/courses/
//else is just /courses
const router = express.Router({ mergeParams: true })


//populate in this case you only want to return the name and description and not the whole assoicated object
router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(protect, addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
