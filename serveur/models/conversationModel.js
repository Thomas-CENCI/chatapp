var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let Users = require("./userModel");
let Messages = require("./messageModel");

var ConversationSchema = new Schema({
    Users : [{
        type : Schema.ObjectId,
        ref : "Users",
        default : null }],
    Messages : [{
        type : Schema.ObjectId,
        ref : "Messages",
        default : null }]
});

module.exports = mongoose.model('Conversation', ConversationSchema);