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
	if(subgroup == "Factory Method"){
		let FM_parentname = req.query.FM_parent_classname;
		let FM_subclass1 = req.query.FM_subclass_name1;
		let FM_subclass2 = req.query.FM_subclass_name2;
		let FM_subclass3 = req.query.FM_subclass_name3;
		let FM_methodname = req.query.FM_method_name;
		let FM_parentfunction1 = req.query.FM_parent_functionname1;
		let FM_parentfunction2 = req.query.FM_parent_functionname2;
		let FM_Description = req.query.FM_description;

		

	}
	

	console.log(subgroup);
	response.render('output', {
		subgroup: subgroup,
		FM_parentname: FM_parentname,
		FM_subclass1: FM_subclass1,
		FM_subclass2: FM_subclass2,
		FM_subclass3: FM_subclass3,
		FM_methodname: FM_methodname,
		FM_parentfunction1: FM_parentfunction1,
		FM_parentfunction2: FM_parentfunction2,
		FM_Description: FM_Description
	});
});

app.get('/', (req, response) => {
	response.render('index');
})






// Listen on port 3000
app.listen(port, () => console.info(`Listening on http://localhost:3000`));