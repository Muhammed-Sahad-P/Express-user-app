const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/user_management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("successfully connected mongodb");
  } catch (error) {
    console.log("Error in connecting to mongodb");
    process.exit(1);
  }
};

module.exports = connectDB;
