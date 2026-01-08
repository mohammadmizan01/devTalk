const mongoose = require("mongoose");
const {DB_CONNECTION_URL} = require("../../env");

const connectDB = async() => {
    await mongoose.connect(DB_CONNECTION_URL);
}

module.exports = connectDB;
