const mongoose = require('mongoose');
const questionauth = require('./questionSchema');
const User = require('./User');
const Q_auth = require('./questionSchema');

const Schema = mongoose.Schema;

const cSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    users: { 
        type: Schema.Types.ObjectId,
        ref: User
    },
    owner_id : { 
        type: Schema.Types.ObjectId,
        ref: Q_auth
    },

},{timestamps: true})

const Comment = mongoose.model('Comment', cSchema);

module.exports = Comment