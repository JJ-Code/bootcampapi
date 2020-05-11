//File meant for explanation purposes. A middleware advanacedResults was created to takecare of pagination
//This will allow other controllers to use it as well

// const path = require('path');
// const ErrorResponse = require('../utils/errorResponse');
// const asyncHandler = require('../middleware/async')
// const Bootcamp = require('../models/Bootcamp');
// const geocoder = require('../utils/geocoder');





// // @desc      Get all bootcamps
// // @route     GET /api/v1/bootcamps
// // @access    Public
// exports.getBootcamps = asyncHandler(async (req, res, next) => {
//   // req.query (a function of express) allows you to run query on it and pass to db (Bootcamp.find(req.query);)
//   //(api / v1 / bootcamps /? housing = true & location.state= MA)
//   //console.log(req.query);
//   //lte and etc... are monooge operators. Regular expression below /b/
//   //below search for a average cost (lte= less than or)
//   let query;
//   //copy req.query
//   let reqQuery = { ...req.query };

//   //Fields to exclude - this was added to front end 'select' so you can use it 
//   //it is in moongoose query.select() as a function for bootcamp.find( query = query.select() ) don't want to match them as fields
//   const removeFields = ['select', 'sort', 'page', 'limit'];

//   //Loop over removeFields and delete them from reqQuery
//   removeFields.forEach(param => delete reqQuery[param])

//   //create query string
//   let queryStr = JSON.stringify(reqQuery);
//   queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);   //console.log(queryStr);

//   //finding resource 
//   //.populate('courses') is a vitural reverse populate has to be defined in schema 
//   query = Bootcamp.find(JSON.parse(queryStr)).populate('courses');

//   //Select Fields - this will only output the fields you selected 
//   if (req.query.select) {
//     const fields = req.query.select.split(',').join(' ');
//     query = query.select(fields)
//   }

//   //Sort
//   if (req.query.sort) {

//     const sortBy = req.query.sort.split(',').join(' ');
//     query = query.sort(sortBy);
//     console.log(query);

//   } else {
//     //default sort by date descending
//     query = query.sort('-createdAt')
//   }

//   //Pagination - page counter
//   const page = parseInt(req.query.page, 10) || 1; //default to page 1 and 10 is base
//   const limit = parseInt(req.query.limit, 10) || 25 //limit 25 bootcamps per query
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const total = await Bootcamp.countDocuments(); //func within mongooes to count pages of your query 

//   query = query.skip(startIndex).limit(limit);

//   //executing query
//   const bootcamps = await query;

//   //Pagination result 
//   const pagination = {};
//   //total all the bootcamps 
//   if (endIndex < total) {
//     pagination.next = {
//       page: page + 1,
//       limit
//     }
//   }
//   if (startIndex > 0) {
//     pagination.prev = {
//       page: page - 1,
//       limit
//     }
//   }


//   res.status(200).json({
//     success: true,
//     count: bootcamps.length,
//     pagination,
//     data: bootcamps
//   });


// })

// // @desc      Get single bootcamp
// // @route     GET /api/v1/bootcamps/:id
// // @access    Public
// exports.getBootcamp = asyncHandler(async (req, res, next) => {
//   const bootcamp = await Bootcamp.findById(req.params.id);

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
//     );
//   }

//   res.status(200).json({ success: true, data: bootcamp });
// });


// // @desc      Get bootcamps within a radius
// // @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// // @access    Private
// exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
//   const { zipcode, distance } = req.params;


//   // Get lat/lng from geocoder
//   const loc = await geocoder.geocode(zipcode);
//   const lat = loc[0].latitude;
//   const lng = loc[0].longitude;

//   // Calc radius using radians
//   // Divide dist by radius of Earth
//   // Earth Radius = 3,963 mi / 6,378 km
//   const radius = distance / 3963;

//   const bootcamps = await Bootcamp.find({
//     location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
//   });

//   res.status(200).json({
//     success: true,
//     count: bootcamps.length,
//     data: bootcamps
//   });
// });




// // @desc      Create bootcamp
// // @route     POST /api/v1/bootcamps
// // @access    Public
// exports.createBootcamp = asyncHandler(async (req, res, next) => {
//   //putting this into the mongoDB database
//   const bootcamp = await Bootcamp.create(req.body);
//   res.status(201).json({
//     success: true,
//     data: bootcamp
//   });

// });


// // @desc      Update bootcamp
// // @route     PUT /api/v1/bootcamps/:id
// // @access    Public
// exports.updateBootcamp = asyncHandler(async (req, res, next) => {

//   const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//   if (!bootcamp) {
//     return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//     //return res.status(400).json({ success: false })
//   }
//   res.status(200).json({
//     success: true,
//     data: bootcamp
//   });

// });


// // @desc      Delete bootcamp
// // @route     DELETE /api/v1/bootcamps/:id
// // @access    Public
// exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
//   const bootcamp = await Bootcamp.findById(req.params.id);

//   if (!bootcamp) {
//     return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
//     // return res.status(400).json({ success: false })
//   }
//   //findByIdAndDelete() won't delete the associated course schema therefore a new method remove() was created in Bootcamp schema file
//   bootcamp.remove();

//   res.status(200).json({
//     success: true,
//     data: {}
//   });
// });


// // @desc      Upload photo for bootcamp
// // @route     PUT /api/v1/bootcamps/:id/photo
// // @access    Private
// exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
//   const bootcamp = await Bootcamp.findById(req.params.id);

//   if (!bootcamp) {
//     return next(
//       new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
//     );
//   }

//   // // Make sure user is bootcamp owner
//   // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
//   //   return next(
//   //     new ErrorResponse(
//   //       `User ${req.user.id} is not authorized to update this bootcamp`,
//   //       401
//   //     )
//   //   );
//   // }

//   if (!req.files) {
//     return next(new ErrorResponse(`Please upload a file`, 400));
//   }

//   console.log(req.files)
//   const file = req.files.file;

//   // Make sure the image is a photo
//   //mimetype: 'image/jpeg' is in the req.files for when the users uploads the photo
//   if (!file.mimetype.startsWith('image')) {
//     return next(new ErrorResponse(`Please upload an image file`, 400));
//   }

//   // Check filesize
//   if (file.size > process.env.MAX_FILE_UPLOAD) {
//     return next(
//       new ErrorResponse(
//         `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//         400
//       )
//     );
//   }

//   // Create custom filename in case there is a photo with the same name 
//   //path has a .ext method which can tell if it is a .jpg and etc
//   file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
//   //console.log(file.name);

//   //This will upload file 
//   //have to setup public/uploads folder and setup static folder then go to photo(ex: http://localhost:5000/uploads/photo_5d725a1b7b292f5f8ceff788.jpg)
//   file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
//     if (err) {
//       console.error(err);
//       return next(new ErrorResponse(`Problem with file upload`, 500));
//     }
//     await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
//     res.status(200).json({
//       success: true,
//       data: file.name
//     });
//   });

// });















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




//THIS IS COURSES WITH POPULATE ON CONTROLLER and not using advancedResults

const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');


// @desc      Get courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });

  } else {
    //populate allows you to return the associated schema model
    query = Course.find().populate({
      path: 'bootcamp',
      select: " name description"
    });
  }

  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses
  });

});


// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @access    Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});


// @desc      Add course
// @route     POST /api/v1/bootcamps/:bootcampId/courses
// @access    Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  //req.body.bootcamp this will grab the bootcamp id from the course schema model
  req.body.bootcamp = req.params.bootcampId;
  //req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  // Make sure user is bootcamp owner
  // if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
  //       401
  //     )
  //   );
  // }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  });
});


// @desc      Update course
// @route     PUT /api/v1/courses/:id
// @access    Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course owner
  // if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.user.id} is not authorized to update course ${course._id}`,
  //       401
  //     )
  //   );
  // }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  course.save();

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Delete course
// @route     DELETE /api/v1/courses/:id
// @access    Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is course owner
  // if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
  //   return next(
  //     new ErrorResponse(
  //       `User ${req.user.id} is not authorized to delete course ${course._id}`,
  //       401
  //     )
  //   );
  // }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});