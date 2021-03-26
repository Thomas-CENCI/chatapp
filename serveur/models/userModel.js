var mongoose = require("mongoose");

var Schema = mongoose.Schema;

let Conversations = require("./conversationModel");

var UserSchema = new Schema({
    username : String,
    conversations : [{
        type : Schema.ObjectId,
        ref : "Conversations",
        default : null 
    }]
})

module.exports = mongoose.model('User', UserSchema);