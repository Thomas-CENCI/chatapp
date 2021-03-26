function getConversations(req, res) {

    let conversation = require("../models/conversation");

    conversation.find({})
    .populate('users')
    .populate('messages')
    .then((conversations) => {
        res.status(200).json(conversations);
    }, (err) => {
        res.status(500).json(err);
    });
 }

function addMessage(req, res) {

    let conversation = require("../models/conversationModel");

    let newMessages = req.body.messages;

    if (!Array.isArray(newMessages)) newMessages = [newMessages];

    conversation.find({_id : req.params.id})
    .then((foundConversation) => {
        newMessages.forEach(i => {
            foundConversation[0].messages.push(i);
        });

        conversation.findByIdAndUpdate(
                {_id: req.params.id}, 
                {"messages" : foundConversation[0].messages},
                {new : true}
            )
            .then((updatedConversation) => {
                res.status(200).json(updatedConversation);
            }, (err) => {
                res.status(500).json(err);
            });
    });
}