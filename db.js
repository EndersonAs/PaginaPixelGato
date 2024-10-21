const mongoose = require('mongoose');
require('dotenv').config();


const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected to Atlas...'))
  .catch(err => console.log(err));

module.exports = mongoose;

