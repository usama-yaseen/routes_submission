var express = require('express');
var router = express.Router();
var Class = require('../models/class');

router.put('/assignstudent/:cid/:sid', function(req, res, next) { 
    Class.findOneAndUpdate({ _id: req.params.cid }, {
        "$push": {
            "students": {
                "sid": req.params.sid
            }
        }
    }, { new: true, upsert: false },
    function(error, results) {
        if (error) {
            return next(error);
        }
        res.json(results);
    });
});
module.exports=router;