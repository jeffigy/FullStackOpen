const mongoose = require("mongoose");
const { MONGODB_URI } = require("../config/env.config");

const connectDb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to db");
  } catch (error) {
    console.log("Error connecting to db", error);
  }
};

module.exports = connectDb;
