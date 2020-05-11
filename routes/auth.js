const express = require('express');
const {
  register,
  login,
  getMe, 
forgotPassword
} = require('../controllers/auth');
//Auth valitated methods with tokens
const { protect, authorize } = require('../middleware/auth');



const router = express.Router();

//const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
// router.get('/logout', logout);
router.get('/me', protect, getMe);
// router.put('/updatedetails', protect, updateDetails);
// router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
// router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;


  // logout,
  // getMe,
  // forgotPassword,
  // resetPassword,
  // updateDetails,
  // updatePassword