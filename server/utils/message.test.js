const expect = require('expect');
var{generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from='Tuhin';
		var text='Hello There';
		var message = generateMessage(from,text);
		expect(message.createdAt).toBeA('number');
		expect(message.text).toBe(text);
		expect(message.from).toBe(from);
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from='Tuhin';
		var latitude = 1;
		var longitude = 1;
		var mapResult = generateLocationMessage(from, latitude, longitude);
		expect(mapResult.createdAt).toBeA('number');
		expect(mapResult.from).toBe(from);
		expect(mapResult.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);

	});
});