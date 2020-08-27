
const config = require("config");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const logger = require("./logger");

const mongoConfig = config.get("db.mongo");
console.log("mongoConfig", mongoConfig);

if (!fs.existsSync(mongoConfig.path))
  return logger.debug("The models storage directory does not exist");

fs.readdirSync(mongoConfig.path)
  .filter((file) => file.indexOf(".") !== 0 && file.slice(-3) === ".js")
  .forEach((file) => require(path.resolve(mongoConfig.path, file)));
if (!mongoConfig.uri) return;

const _mongoConnectError = function (err) {
  logger.error(`mongoose default connection has occured error`);
};
const _mongoConnectSuccess = function () {
  logger.info(`mongoose default connection successfully`);
};
const _mongodbDisconnected = function () {
  logger.info(`mongoose default connection is disconnected`);
};
mongoose.connect(mongoConfig.uri, mongoConfig.options);

mongoose.connection
  .on("error", _mongoConnectError)
  .on("connected", _mongoConnectSuccess)
  .on("disconnected", _mongodbDisconnected);