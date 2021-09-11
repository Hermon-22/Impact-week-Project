const mongoose = require('mongoose');

// dotenv
require('dotenv').config();

const url = process.env.MONGO_URI

// database connection
const dbURI = url;   
mongoose.connect(`${dbURI}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(console.log('connected to db'))
    .catch((err) => console.log(err));
