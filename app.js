const express = require('express');
var bodyParser = require("body-parser");

const mysql = require('mysql');
const connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'patternDB',
	user:'root',
	password:''
});
//var database = require('../database');

var database_connection_status = '';
connection.connect(function(error){
	if(error){
		//database_connection_status = '<h3 class="text-center text-danger">MySQL Database Connection Error</h3>';
		console.log('Database connection error');
	}
	else{
		//database_connection_status = '<h3 class="text-center text-danger">Successfully connected to MySQL Database</h3>';
		console.log('Database connection was successful');
	}
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');


// Navigation
// app.post("/output", (req, response) => {
// 	response.render('output', {subgroup: req.body.subgroup});
// });

app.get('/help', (req, response) => {
	response.render('help');
})

app.get('/form', (req, response) => {
	let type = req.query.type;
	response.render('form', {
        type: type
    });
})

app.get('/output', (req, response) => {
	let subgroup = req.query.subgroup;
	var FM_parentname = "";
	var FM_subclass1 = "";
	var FM_subclass2 = "";
	var FM_subclass3 = "";
	var FM_methodname = "";
	var FM_parentfunction1 = "";
	var FM_parentfunction2 = "";
	var FM_Description = "";
	// var AF_abstractName = "";
	// var AF_firstVariant = "";
	// var AF_secondVariant = "";
	// var AF_thirdVariant = "";
	if(subgroup == "Factory Method"){
		FM_parentname = req.query.FM_parent_classname;
		FM_subclass1 = req.query.FM_subclass_name1;
		FM_subclass2 = req.query.FM_subclass_name2;
		FM_subclass3 = req.query.FM_subclass_name3;
		FM_methodname = req.query.FM_method_name;
		FM_parentfunction1 = req.query.FM_parent_functionname1;
		FM_parentfunction2 = req.query.FM_parent_functionname2;
		FM_Description = req.query.FM_description;


		var query = "INSERT INTO factorymethodtable (parentClass, subClass1, subClass2, subClass3, sharedFunction, parentFunc1, parentFunc2, descr) VALUES " + 
		"('" + FM_parentname + "', '" + FM_subclass1 + "', '" + FM_subclass2 + "', '" + FM_subclass3 + "', '" + FM_methodname + "', '" + FM_parentfunction1 + "', '" + FM_parentfunction2 + "', '" + FM_Description + "')";

		connection.query(query, function(error, data){
			if(error){
				throw error;
			}
			else{
				console.log('Success?');
			}
		});

	}
	// let FM_parentname = req.query.FM_parent_classname;
	// let FM_subclass1 = req.query.FM_subclass_name1;
	// let FM_subclass2 = req.query.FM_subclass_name2;
	// let FM_subclass3 = req.query.FM_subclass_name3;
	// let FM_methodname = req.query.FM_method_name;
	// let FM_parentfunction1 = req.query.FM_parent_functionname1;
	// let FM_parentfunction2 = req.query.FM_parent_functionname2;
	// let FM_Description = req.query.FM_description;

	 connection.query('SELECT * FROM factorymethodtable', async function (err, result) {
		if (err) throw err;

		response.render('output', {data: result});
	  });

	// console.log(subgroup);
	// response.render('output', {
	// 	subgroup: subgroup,
	// 	FM_parentname: FM_parentname,
	// 	FM_subclass1: FM_subclass1,
	// 	FM_subclass2: FM_subclass2,
	// 	FM_subclass3: FM_subclass3,
	// 	FM_methodname: FM_methodname,
	// 	FM_parentfunction1: FM_parentfunction1,
	// 	FM_parentfunction2: FM_parentfunction2,
	// 	FM_Description: FM_Description
	// });
});

app.get('/', (req, response) => {
	response.render('index');
})






// Listen on port 3000
app.listen(port, () => console.info(`Listening on http://localhost:3000`));