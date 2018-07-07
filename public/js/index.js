var socket = io();
		socket.on('connect', function()  {
			console.log('Connected to server');
			

			/*socket.emit('createEmail',{
				to:'Tuhin@gmailo.com',
				text:'Hey',
			});	*/	

		

		socket.on('disconnect', function() {
			console.log('Disconnected from server');
		});
});
		/*socket.on('newEmail', function(email){
			console.log('New email',email)
		});*/

		socket.on('newMessage', function(message) { //Event listener for the new Message from the server
			console.log('newMessage', message);
		});