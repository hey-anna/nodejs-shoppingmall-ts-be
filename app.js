const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB 연결 성공"))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

app.listen(process.env.PORT || 5051, () => {
  console.log("server on");
});

module.exports = app;
