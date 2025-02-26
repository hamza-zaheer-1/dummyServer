const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://192.168.3.219:27017/dummy");
  console.log("mongo db connected");
};

module.exports = { connectDB };
