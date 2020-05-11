const express = require('express');
const {
  getCourses, getCourse, addCourse, updateCourse, deleteCourse
} = require('../controllers/courses');

// mergeParams allows this to happen bootcamps/5d713995b721c3bb38c1f5d0/courses/
//else is just /courses
const router = express.Router({ mergeParams: true })



router.route('/').get(getCourses).post(addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
