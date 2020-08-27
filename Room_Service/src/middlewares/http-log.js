const morgan = require("morgan");
const logger = require("../lib/logger.js");

module.exports = function () {
  const stream = {
    write: (message) => logger.info(message),
  };

  if (process.env.NODE_ENV === "production") {
    return morgan("combined", {
      stream,
    });
  }
  return morgan("dev", {
    stream,
  });
}