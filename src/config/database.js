const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://shiva_dcode:XI0k3TZFUiHbWliJ@devcluster.tvq0u5d.mongodb.net/DevTinder"
  );
};

module.exports = connectDB;
