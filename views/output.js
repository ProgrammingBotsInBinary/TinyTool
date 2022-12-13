var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM factorymethodtable";

    database.query(query, function(error, data){

        if(error){
            throw error;
        }
        else{
            response.render('output', {title:'Something Something Application', action:'list', sampleData:data});
        }
    });

});

//6 Mins in on Fetch and Display

module.exports = router;