var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let User = require("./userModel");
let Conversation = require("./conversationModel");

var MessageSchema = new Schema({
    message : String,
    sender : [{
        type : Schema.ObjectId,
        ref : "user",
        default : null }],
    receiver : [{
        type : Schema.ObjectId,
        ref : "user",
        default : null }]
});

module.exports = mongoose.model('Message', MessageSchema);