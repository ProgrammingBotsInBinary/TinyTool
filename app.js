// var express = require("express");
// var path = require("path");
// var routes = require("./routes");
// var app = express();

const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/js', express.static(__dirname + '/public/js'));

app.get('', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
})

app.listen(port, () => console.info(`Listening on port ${port}`));



// app.set("port", process.env.PORT || 3000);
// app.use(routes);
// let http = require('http');
// let fs = require('fs');
// app.use(express.static(__dirname + '/public/css'));

// let handleRequest = (request, response) => {
//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.readFile('./index.html', null, function (error, data) {
//         if (error) {
//             response.writeHead(404);
//             respone.write('Whoops! File not found!');
//         } else {
//             response.write(data);
//         }
//         response.end();
//     });
// };

// http.createServer(handleRequest).listen(3000); 