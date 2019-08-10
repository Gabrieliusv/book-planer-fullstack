const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

//Connect to Mongo
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true });

    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err.message);
    //Exit process
    process.exit(1);
  }
};

module.exports = connectDB;
