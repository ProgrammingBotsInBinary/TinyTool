var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
    console.log("Im on the start page");
    //res.render("index");
});

module.exports = router;