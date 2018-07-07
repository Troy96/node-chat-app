const expect = require('expect');
var{generateMessage} = require('./message');

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