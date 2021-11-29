const { Router } = require('express');
const questionController = require('../controller/questionController');
// const requireAuth = require('../middleware/middlewareAuth')
const { checkUser, requireAuth } = require('../middleware/middlewareAuth');
const authController = require('../controller/authcontroller');


const router = Router();

router.all('*', checkUser) 

// home
router.get('/', questionController.homePage)

// signup
router.get('/auth', authController.signup_get)
router.post('/auth/signup', authController.signup_post) 

// Login
router.get('/auth', authController.login_get)
router.post('/auth/login', authController.login_post)

// Log Out
router.get('/logout', authController.logout_get);

// QUESTION Routes
router.all('/addQuestion', requireAuth, questionController.newQuestion) 

// see More& comment
router.get('/question/:id', questionController.seeMore_get);
router.post('/question/:id', requireAuth,questionController.seeMore_post);
router.get("/comment/delete/:id", questionController.delete_comment )

// Edit a question
router.get('/question/edit/:id', questionController.editQuestion_get);
router.post('/question/edit/:id', questionController.editQuestion_post);

// delete a question
router.get('/question/delete/:id', questionController.removeQ)

// NOT FOUND
router.get('/:id', authController.notFound)


module.exports = router

