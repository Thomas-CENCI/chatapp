function getUser(req, res){
    let User = require("../models/userModel");

    User.find({username: req.body.username}, function(err, user){
        if (user.length == 0){
            let temp_user = new User({username: req.body.username});
            temp_user.save(function(create_err){
                if (create_err){
                    res.status(500).json();
                }
                else{
                    res.status(200).json();
                }
            });
        }
        else{
            res.status(200).json();
        }
    })
}

module.exports.getUser = getUser;



