const express = require('express');
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users');

const User = require('../models/User');

// mergeParams allows this to happen bootcamps/5d713995b721c3bb38c1f5d0/user/
const router = express.Router({ mergeParams: true });


const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

//passing the middleware into the router allows all the user routes to be access those functions 
router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;