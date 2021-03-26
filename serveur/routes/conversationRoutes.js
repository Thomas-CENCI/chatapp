//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/conversationControllers');

//CREATE
router.post("/createConversation", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/getConversation", (req, res) => {
    
    controller.read(req, res);

});

//ADD
router.post("/addMessage/:id", (req,res) => {

    controller.add(req, res);
    
});

module.exports = router;