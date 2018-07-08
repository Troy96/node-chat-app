const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);

var io = socketIO(server);
const{generateMessage, generateLocationMessage} = require('./utils/message');
//App middleware for rendering static files
app.use(express.static(path.join(__dirname,'../public')));


//register event listener
io.on('connection', (socket) => {
	console.log('New user connected');

	/*socket.emit('newEmail',{
		from: 't@xmple.com',
		text:'hey',
		createrdAt: 123
	});

	socket.on('createEmail', (newEmail) => {
		console.log('createEmail',newEmail);
	});*/

	socket.on('disconnect', ()=> {

		console.log('disconnected from the server');

	});

	socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom!'));
	socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined!'));


	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback('Inside callback!');


		socket.on('createLocationMessage', (coords)=>{
			io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
		});
	/*socket.broadcast.emit('newMessage',{
		from: message.from,
		text: message.text,
		createdAt: new Date().getTime()
	});
	*/

});
});

//Make server listen at port 3000 for requests
server.listen(port, () => {
	console.log(`Server running at ${port}...`);
});

