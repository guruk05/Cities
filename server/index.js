const express = require("express");
const app = require("express")();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./Config/keys");

// MiddleWare

app.use(cors());
app.use(express.json());

app.use("/", require("./Routes/router"));

// Mongoose Connection

mongoose.connect(config.mongoURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
console.log("connected");

app.listen(process.env.PORT || 8000);

console.log("server ruuning on PORT 8000");
