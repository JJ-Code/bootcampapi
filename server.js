const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors'); //makes console.og different colors
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db');


// Load env vars
dotenv.config({ path: './config/config.env' });

//Connect to database
connectDB();


//Routes files
const bootcamps = require('./routes/bootcamps')

//initatlize express
const app = express();


// Body parser
app.use(express.json());


//own custom logs req to terminal must before mount router
//app.use(logger);

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


//Mount routers
app.use('/api/v1/bootcamps', bootcamps);


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