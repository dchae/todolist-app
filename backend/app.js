const express = require("express");
const path = require("path");

const apiRouter = require("./routes/api");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("dist"));
app.use("/doc", express.static("public/doc"));
app.use("/api", apiRouter);

module.exports = app;
