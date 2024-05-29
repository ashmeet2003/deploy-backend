// model for api error
class ApiError extends Error {
  constructor(
    statusCode,
    message = "something went wrong",
    errors = [],
    stack = ""
  ){
    //setting property
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    this.success = false
    this.errors = errors

    //production grade
    // If a stack trace is provided, use it; otherwise, capture the current stack trace
    if(stack) {
      this.stack = stack
    } else{
      Error.captureStackTrace(this ,this.constructor)
    }
  }
}

export {ApiError}