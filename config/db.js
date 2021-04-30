
const mongoose = require('mongoose');
const { DB_URI } = require('.')

mongoose.set('debug', true);
mongoose.set('useCreateIndex', true);

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;