const expect = require('expect');
const{Users} = require('./users');


describe('Users', () => {
	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id:1,
			name:'Tuhin',
			room:'Node'
		},
		{
			id:2,
			name:'Roy',
			room:'Node Course'
		},
		{
			id:3,
			name:'Troy',
			room:'Node Course'
		}];
	});

	it('should add new user', () => {
		var users = new Users();
		var user = {
			id: '1223',
			name:'Trojan',
			room:'The Cool Guys'
		};

		var res = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});
	it('should return all names for Node Course', ()=> {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['Roy','Troy']);
	});

	it('should return all names for Node ', ()=> {
		var userList = users.getUserList('Node');
		expect(userList).toEqual(['Tuhin']);
	});

	it('should remove a user', () => {
		var id = 1;
		var user = users.removeUser(id);
		expect(user.id).toBe(id);
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var id = 19;
		var user = users.removeUser(id);
		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user', () => {
		var userId = 3;
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('should not find  user', () => {

		var userId = 7;
		var user = users.getUser(userId);

		expect(user).toNotExist();
				
	});

});