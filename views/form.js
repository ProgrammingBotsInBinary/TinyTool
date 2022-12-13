var express = require('express');

var router = express.router();

var database = require('../database');

//router.set('views', './views');
//router.set('view engine', 'ejs');

// router.get('/help', (req, response) => {
// 	response.render('help');
// })

router.get("/submit", function(request, response, next){
    console.log('Clicked submit button');
    //response.send('Add Sample Data');
    //var first_name = request.body.first_name;

});


module.exports = router;