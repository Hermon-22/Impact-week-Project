const mongoose = require('mongoose');

// dotenv
require('dotenv').config();

const url = process.env.MONGO_URI


mongoose.connect( url , { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then(console.log('connected to db'))
    .catch((err) => console.log(err));
