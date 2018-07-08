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
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = jQuery('#message-template').html();
			var  html = Mustache.render(template, {
				text: message.text,
				from: message.from,
				createdAt: formattedTime
			});

			jQuery('#messages').append(html);
		});

		/*socket.emit('createMessage', {
			from: 'Tuhin',
			text: 'Hi'
		}, function(data) {
			console.log('Got it!',data);
		});
		*/

		socket.on('newLocationMessage', function(message){
			var formattedTime = moment(message.createdAt).format('h:mm a');
			var template = jQuery('#location-message-template').html();
			var html = Mustache.render(template,{
				from: message.from,
				createdAt: formattedTime,
				url: message.url
			});

			jQuery('#messages').append(html);
		});
		jQuery('#message-form').on('submit', function(e) {
			e.preventDefault();

			var messageTextBox = jQuery('[name=message]')
			socket.emit('createMessage', {
				from: 'User',
				text: messageTextBox.val()
			}, function(){
				messageTextBox.val('');
			});
		});
		var locationButton = jQuery('#send-location');
		locationButton.on('click', function(){
			if (!navigator.geolocation){
				return alert('Geolocation not supported by your browser');
			}

			locationButton.attr('disabled', 'disabled').text('Sending Location...');

			navigator.geolocation.getCurrentPosition(function(position) {
				locationButton.removeAttr('disabled').text('Send Location');
				socket.emit('createLocationMessage', {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				});
			}, function(){
				locationButton.removeAttr('disabled').text('Send Location');
				alert('Unable to fetch location');
			});
		});





