//helper function to handle error responses
//this allows create additional methods on top of Error method

class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    //Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorResponse;