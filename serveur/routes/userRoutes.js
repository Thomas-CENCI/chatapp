//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/userController');

//READ
router.get("/getUser/", (req, res) => {
    controller.getUser(req, res);
});

module.exports = router;