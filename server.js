const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); //makes console.og different colors
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();


//Routes files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');


//initatlize express
const app = express();


// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());


//own custom logs req to terminal must before mount router
//app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

//Sanatize Data To Prevent Hacking 
app.use(mongoSanitize());


//Set Secutrity Headers to Prevent Attack 
app.use(helmet());

//Prevent XSS attacks which means don't let users input script tags as value fields 
//because we take those fields and output in the DOM which means the script will excute in DOM
app.use(xss());

//Rate Limiting - this set a limit amount on how many request can come from a specific IP (will return error 429)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 mins
  max: 100 //100 requests
});

app.use(limiter);

//Prevent http param pollutions
app.use(hpp());

//Enables CORS since this is a public API. Allows for more then 1 domain to access API 
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));



//Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);



//Error handling is linear needs to be after mount routers
app.use(errorHandler);



//port info
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV}  mode on port ${PORT}!`.yellow.bold);
});

// Handle unhandled promise rejections for all 
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});