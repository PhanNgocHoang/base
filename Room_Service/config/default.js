const normalizePort = require("normalize-port");
const path = require("path");

module.exports = {
  app: {
    PORT: normalizePort(process.env.PORT) || 3000,
  },
  logger: {
    file: {
      level: "info",
      filename: path.resolve("server", "logs", "app.log"),
      handleExceptions: true,
      maxsize: 1024 * 1024 * 5,
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: "debug",
      handleExceptions: true,
      colorize: true,
    },
  },
  db: {
    mongo: {
      path: path.resolve("server", "src", "apps", "models"),
      uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017",
      options: {},
    },
  },
};