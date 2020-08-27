const express = require("express");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Http log middleware
app.use(require("./middlewares/http-log.js")());

// Connect mongodb
require("./lib/mongo-db.js");

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(cors());

// Static file
app.use("/assets", express.static(path.resolve("server", "src", "public")));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/", require("../routes/web"));

// Not match router
app.use("*", require("./middlewares/not-match-router"));

app.use(require("./middlewares/handle-error.js"));

module.exports = app;