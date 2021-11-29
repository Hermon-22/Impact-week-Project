const User = require('../model/User');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {  username: '', email: '', password: ''}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered, try to signup'
    }
    if (err.message = 'incorrect password') {
        errors.password = 'this is incorrect password'      
    }
    // duplicate error code- throw this error if email is duplicated
    if (err.code === 11000) {
    errors.email = 'that email is already registered',
    errors.username = 'username already exists, try new username'
    return errors;
    }
    // validation errors- errors in the terminal
    if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
        errors[properties.path] = properties.message
    }); 
    }
    
    return errors;
}

const maxAge = 2 * 60 * 60 * 24;
const createToken  = (id) => {
    return jwt.sign({ id }, 'hh secret', {
        expiresIn: maxAge
    })
}


const signup_get = (req, res) => {
    res.render('loginSignup', {pageTitle: 'Authentication'} )
}
const login_get = (req, res) => {
    res.render('loginSignup', {pageTitle: 'Authentication'} )
}
const signup_post = async (req, res) => {

    const { username, email, password } = req.body;    
    try {
        const user = await  User.create({ username, email, password });
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id });
        // console.log('user saved')
    }
    catch(err) {
        const errors =  handleErrors(err)
        res.status(400).json({ errors })
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;  
    try {
        const user = await  User.login( email, password );
        const token = createToken(user._id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000})
        res.status(201).json({ user: user._id });
    }
    catch(err){
        const errors = handleErrors(err);
        return res.status(400).json({ errors })   
    }
}

const logout_get = ( req, res )  => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/')
}

const notFound = ( req, res) => {
    res.status(404).render('404', {pageTitle: 'Not found'} )
}


module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get,
    notFound
}