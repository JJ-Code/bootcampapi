const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Bootcamp = require('../models/Bootcamp');


// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();
  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });

  
})

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: bootcamp });
});


// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps
// @access    Public
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  //putting this into the mongoDB database
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });

});


// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Public
exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
      //return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });

});


// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Public
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
      // return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: {}
    });
});


















/*// @desc      Get all bootcamps
// @route     GET /api/v1/bootcamps
// @access    Public
exports.getBootcamps = async (req, res, next) => {
  //mongoDB expects a promise thats why it can be async
  try {
    const bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps
    });
  } catch (error) {
    next(error);
    //res.status(400).json({ success: false })
  }

  //res.status(200).json({ success: true, msg: 'show all bootcamps' });
}

// @desc      Get single bootcamp
// @route     GET /api/v1/bootcamps/:id
// @access    Public
exports.getBootcamp = async (req, res, next) => {

  try {
    const bootcamp = await Bootcamp.findById(req.params.id);

    //this is needed because catch will not get it bc it is correctly formatted aka same num of chars
    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
      //return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    //next(error); offer by express for error handling
    //next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    next(error);

    //res.status(400).json({ success: false })

  }
  //res.status(200).json({ success: true, msg: `get bootcamp ${req.params.id}` });
}


// @desc      Create bootcamp
// @route     POST /api/v1/bootcamps
// @access    Public
exports.createBootcamp = async (req, res, next) => {
  // console.log(req.body);
  // res.status(200).json({ success: true, msg: 'create new bootcamp' });

  //putting this into the mongoDB database
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {
    next(error);
    //must have err catch to not make front end hang
    //res.status(400).json({ success: false })
  }


}


// @desc      Update bootcamp
// @route     PUT /api/v1/bootcamps/:id
// @access    Public
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
      //return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: bootcamp
    });
  } catch (error) {

    next(error);
    //must have err catch to not make front end hang
    //res.status(400).json({ success: false })
  }


  //res.status(200).json({ success: true, msg: `update bootcamp ${req.params.id}` });
}


// @desc      Delete bootcamp
// @route     DELETE /api/v1/bootcamps/:id
// @access    Public
exports.deleteBootcamp = async (req, res, next) => {

  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
      // return res.status(400).json({ success: false })
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);

    //must have err catch to not make front end hang
    //res.status(400).json({ success: false })
  }

  //res.status(200).json({ success: true, msg: `delete bootcamp ${req.params.id}` });
}*/