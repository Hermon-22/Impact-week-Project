const express = require('express');
const authroutes = require('./routes/authRoutes');
require('./config/mongoose');
const cookieparser = require('cookie-parser');
// const { checkUser, requireAuth } = require('./middleware/middlewareAuth');

const app = express();

// dotenv
require('dotenv').config();
const port = process.env.PORT

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieparser())

// view engine
app.set('view engine', 'ejs');


// routes

// app.get('/', (req, res) => res.render('home'));
// app.get('/addQuestion', requireAuth , (req, res) => res.render('addQuestion'));
app.use(authroutes);
app.use((req, res)=> res.status(404).render('404'))



app.use((req, res)=> res.status(404).render('404'))

// listen to 4000
app.listen( port, ()=> console.log('connected to port ' + port)) 