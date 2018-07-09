const socketIO = require('socket.io');
const http = require('http');
const path = require('path');
const express = require('express');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000
var app = express();
var server = http.createServer(app);
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var io = socketIO(server);
var users = new Users();
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

	

	
	socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chatroom!'));
	socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} joined!`));




    callback();
  });

	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		io.emit('newMessage', generateMessage(message.from, message.text));
		callback();
	});

		socket.on('createLocationMessage', (coords)=>{
			io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
		});
	/*socket.broadcast.emit('newMessage',{
		from: message.from,
		text: message.text,
		createdAt: new Date().getTime()
	});
	*/
	socket.on('disconnect', ()=> {

		var user = users.removeUser(socket.id);

		if(user){
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left`));
		}
	});


});



//Make server listen at port 3000 for requests
server.listen(port, () => {
	console.log(`Server running at ${port}...`);
});

