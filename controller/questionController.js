const Q_auth = require('../model/questionSchema');
const Comment = require('../model/commentSchema');

const homePage = (req, res) => {
    Q_auth.find().populate('users',['username'])
    .then(result => {
        res.render('home', { result, pageTitle:'Home' })
    }) 
}

const newQuestion = (req, res) => {
    if (req.method === 'GET') {
            res.render('addQuestion', { pageTitle:'New Question', error:null })      
    }
    if (req.method === 'POST') {
        const question = new Q_auth(req.body)
        // console.log(res.locals.user)
        // console.log(question)
        question.users = res.locals.user._id
        question.save() 
        
        .then(()=>{ 
            // console.log(resp) 
            res.redirect('/')
        })
        .catch(err => res.render('addQuestion', { pageTitle:'New Question', error: err.errors }))
        // console.log(question)
    }
}

const seeMore_get = (req, res) => {
        Q_auth.findById({_id: req.params.id}).populate('users', ['username']) 
    .then(result => {

        Comment.find({owner_id: {$in: [result._id]} })
        .populate('users', ['username'])

        .then( comment => {
            // console.log(comment)
            res.render('seeMore', { result, comment, pageTitle:'See More' })
        })
        // console.log(result)
        
    }) 
}

const seeMore_post = (req, res) => {
    const commentbody = new Comment(req.body)

        commentbody.users = res.locals.user._id
        commentbody.owner_id = req.params.id

        commentbody.save()

        .then(() => {
            res.redirect('/question/'+ req.params.id )
        })
        .catch(err => console.log(err.errors) )
}



const editQuestion_post = (req, res ) =>{ 
    Q_auth.findByIdAndUpdate({_id: req.params.id})
    .then(result => {
        result.question = req.body.question,
        result.description = req.body.description
        result.save()
        .then(()=>{  
            res.redirect('/question/' + req.params.id )
        })
        .catch(err => console.log(err.message)) 
    })
    
}

const editQuestion_get = (req, res) => {
    Q_auth.findById({ _id: req.params.id})
    .then( (result) => {
        res.render('editQuestion', { result, pageTitle:'Edit One Question', error:null })   
    })
    
}

const removeQ = (req, res) => {
    Q_auth.findByIdAndDelete({_id: req.params.id})
    // Comment.findByIdAndDelete({ _id:req.params.id })
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

const delete_comment = (req, res) => {
    Comment.findByIdAndDelete({ _id:req.params.id })
    .then( del => {
        // console.log( del.owner_id, 'question id of deleted comment')
        res.redirect('/question/'+ del.owner_id )
    })
    .catch(err => console.log(err.message))
}

module.exports = {
    newQuestion,
    homePage,
    editQuestion_post,
    editQuestion_get,
    seeMore_get,
    seeMore_post,
    delete_comment,
    removeQ 
}