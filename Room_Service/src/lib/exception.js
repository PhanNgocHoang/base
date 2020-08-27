
const httpStatus = require("http-status-codes");

class HttpException extends Error {
  constructor(message, statusCode, name, data, isOperational = true) {
    super(message);

    this.data = data;
    this.status = statusCode >= 500 ? "error" : "fail";
    this.isOperational = isOperational;
    this.statusCode = statusCode;
    this.name = name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class MethodNotAllowedExceprion extends HttpException {
  constructor(message = "Method Not Allowed", data) {
    super(
      message,
      httpStatus.METHOD_NOT_ALLOWED,
      "MethodNotAllowedExceprion",
      data
    );
  }
}

class UnAuthorizedException extends HttpException {
  constructor(message = "Unauthorized", data) {
    super(message, httpStatus.UNAUTHORIZED, "UnAuthorizedException", data);
  }
}

class BadRequestException extends HttpException {
  constructor(message = "Bad Request", data) {
    super(message, httpStatus.BAD_REQUEST, "BadRequestException", data);
  }
}

class NotFoundException extends HttpException {
  constructor(message = "Not Found") {
    super(message, httpStatus.NOT_FOUND, "NotFoundException");
  }
}

class InternalServerError extends HttpException {
  constructor(message = "Internal Server Error") {
    super(
      message,
      httpStatus.INTERNAL_SERVER_ERROR,
      "InternalServerError",
      false
    );
  }
}

class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(message, httpStatus.FORBIDDEN, "ForbiddenException");
  }
}

module.exports = {
  HttpException,
  BadRequestException,
  NotFoundException,
  InternalServerError,
  ForbiddenException,
  UnAuthorizedException,
  MethodNotAllowedExceprion,
};