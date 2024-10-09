const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://arizaambiente:72584@cluster0.aepl1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

module.exports = mongoose;
