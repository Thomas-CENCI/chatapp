//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/messageControllers');

//CREATE
router.post("/createMessage", (req, res) => {

    controller.create(req, res);

});

//READ
router.get("/getMessage/:id", (req, res) => {
    
    controller.read(req, res);

});

module.exports = router;