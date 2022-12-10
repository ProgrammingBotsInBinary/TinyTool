const express = require('express');

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
const port = 3000;

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));

// Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, response) => {
	response.render('index');
})

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
	response.render('output');
})

// Listen on port 3000
app.listen(port, () => console.info(`Listening on http://localhost:3000`));