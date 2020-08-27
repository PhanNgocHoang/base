const { NotFoundException } = require("../lib/exception");

module.exports = (req, res, next) =>
  next(
    new NotFoundException(`Can't not find ${req.originalUrl} on this server!`)
  );