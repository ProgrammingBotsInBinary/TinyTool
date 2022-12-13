//const { builtinModules } = require('module');
const mysql = require('mysql');

const connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	database:'patternDB',
	user:'root',
	password:''
});

connection.connect(function(error){
    if(error){
        throw error;
    }
    else{
        console.log('MySQL Database is connected successfully.')
    }

});

module.exports = connection;