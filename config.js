const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://localhost:27017/dummy");
  console.log("mongo db connected");
};

module.exports = { connectDB };
