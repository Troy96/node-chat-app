const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

//App middleware for rendering static files
app.use(express.static(path.join(__dirname,'../public')));


//register event listener
io.on('connection', (socket) => {
	console.log('New user connected');

	socket.on('disconnect', ()=> {

		console.log('disconnected from the server');

	});

});

//Make server listen at port 3000 for requests
server.listen(port, () => {
	console.log(`Server running at ${port}...`);
});

