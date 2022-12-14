const express = require('express');
const ejs = require('ejs');
var bodyParser = require("body-parser");
var async = require('async');

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
	// let isSubmit = req.query.submitBtn;

	// if (isSubmit == true) {
		var FM_parentname = "";
		var FM_subclass1 = "";
		var FM_subclass2 = "";
		var FM_subclass3 = "";
		var FM_methodname = "";
		var FM_parentfunction1 = "";
		var FM_parentfunction2 = "";
		var FM_Description = "";
		var AF_abstractName = "";
		var AF_firstVariant = "";
		var AF_secondVariant = "";
		var AF_thirdVariant = "";
		var AF_firstMethod = "";
		var AF_secondMethod = "";
		var AF_thirdMethod = "";
		var AF_Description = "";
		var B_classname = "";
		var B_firstMethod = "";
		var B_secondMethod = "";
		var B_thirdMethod = "";
		var B_fourthMethod = "";
		var B_fifthMethod = "";
		var B_sixthMethod = "";
		var B_Description = "";
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
					console.log('Successfully input values into FactoryMethodTable in DB');
				}
			});

		}
		if(subgroup == "Abstract Factory"){
			AF_abstractName = req.query.AF_classname;
			AF_firstVariant = req.query.AF_firstvariant;
			AF_secondVariant = req.query.AF_secondvariant;
			AF_thirdVariant = req.query.AF_thirdvariant;
			AF_firstMethod = req.query.AF_firstmethod;
			AF_secondMethod = req.query.AF_secondmethod;
			AF_thirdMethod = req.query.AF_thirdmethod;
			AF_Description = req.query.AF_description;

			var query = "INSERT INTO abstractfactorytable (abstractName, firstVariant, secondVariant, thirdVariant, firstMethod, secondMethod, thirdMethod, descr) VALUES " + 
			"('" + AF_abstractName + "', '" + AF_firstVariant + "', '" + AF_secondVariant + "', '" + AF_thirdVariant + "', '" + AF_firstMethod + "', '" + AF_secondMethod + "', '" + AF_thirdMethod + "', '" + AF_Description + "')";

			connection.query(query, function(error, data){
				if(error){
					throw error;
				}
				else{
					console.log('Successfully input values into AbstractFactoryTable in DB');
				}
			});
		}
		if(subgroup == "Builder"){
			B_classname = req.query.B_classname;
			B_firstMethod = req.query.B_firstmethod;
			B_secondMethod = req.query.B_secondmethod;
			B_thirdMethod = req.query.B_thirdmethod;
			B_fourthMethod = req.query.B_fourthmethod;
			B_fifthMethod = req.query.B_fifthmethod;
			B_sixthMethod = req.query.B_sixthmethod;
			B_Description = req.query.B_description;

			var query = "INSERT INTO buildertable (className, firstMethod, secondMethod, thirdMethod, fourthMethod, fifthMethod, sixthMethod, descr) VALUES " + 
			"('" + B_classname + "', '" + B_firstMethod + "', '" + B_secondMethod + "', '" + B_thirdMethod + "', '" + B_fourthMethod + "', '" + B_fifthMethod + "', '" + B_sixthMethod + "', '" + B_Description + "')";

			connection.query(query, function(error, data){
				if(error){
					throw error;
				}
				else{
					console.log('Successfully input values into BuilderTable in DB');
				}
			});

		}
	//}

	connection.query('SELECT * FROM factorymethodtable', function(err, result, client){
		var factoryResult = result;
		connection.query('SELECT * FROM abstractfactorytable', function(err, result, client){
			var abstractResult = result;
			connection.query('SELECT * FROM buildertable', function(err, result, client){
				var builderResult = result;
				response.render('output', { 	
						factoryResult: factoryResult, 
						abstractResult: abstractResult, 
						builderResult: builderResult
				});
			});
		});
	});

});

app.get('/', (req, response) => {
	response.render('index');
})






// Listen on port 3000
app.listen(port, () => console.info(`Listening on http://localhost:3000`));