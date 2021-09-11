const mongoose = require('mongoose');
const User = require('./User');



const newSchema = new mongoose.Schema({
    
    question: { 
        type:String,
        required: [true, 'question field should not be empty']
    },
    description: { 
        type:String,
        required:[true, 'description field should not be empty']
    },
    users : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})

const Q_auth = mongoose.model('Q_auth', newSchema)

module.exports = Q_auth;