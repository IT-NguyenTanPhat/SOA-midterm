const {
	login,
	logout,
	forLoggedIn,
	forAnonymous,
} = require('../../src/controllers/auth');
// const bcrypt = require('bcryptjs');
const { UserService } = require('../../src/services/user');
// fake
jest.mock('../../src/services/user');
jest.mock('bcryptjs');

it('will send: Missing email and password', async () => {
	const req = {
		body: {
			// username: '52000716',
			password: '123456',
		},
	};

	const res = {
		send: jest.fn((x) => x),
	};

	await login(req, res);
	expect(req.send).toHaveBeenCalledTimes(1);
	expect(req.send).toHaveBeenCalledWith(
		'Please provide an username and password.'
	);
});

it('will send: Incorrect username or password (email not found)', async () => {
	const req = {
		body: {
			username: '52000716',
			password: '123456',
		},
	};

	const res = {
		send: jest.fn((x) => x),
	};

	UserService.get.mockImplementationOnce(() => null);

	await login(req, res);
	expect(req.send).toHaveBeenCalledTimes(1);
	expect(req.send).toHaveBeenCalledWith('Incorrect username or password');
});

it('will send: Incorrect username or password (wrong password)', async () => {
	const req = {
		body: {
			username: '52000716',
			password: '123456',
		},
	};

	const res = {
		send: jest.fn((x) => x),
	};

	UserService.get.mockImplementationOnce(() => ({
		password: '123455',
		_id: '1',
		email: 'test@example.com',
		tel: '000',
	}));

	bcrypt.compare.mockImplementationOnce(() => false);

	await login(req, res);
	expect(req.send).toHaveBeenCalledTimes(1);
	expect(req.send).toHaveBeenCalledWith('Incorrect username or password');
});

it('will send token', () => {
	const req = {
		body: {
			username: '52000716',
			password: '123456',
		},
	};

	const res = {
		send: jest.fn((x) => x),
	};

	UserService.get.mockImplementationOnce(() => ({
		password: '123455',
		_id: '1',
		email: 'test@example.com',
		tel: '000',
	}));

	bcrypt.compare.mockImplementationOnce(() => true);
});

generateToken.mockReturnValue(id);
isValidToken
	.mockReturnValueOnce(new Error('Denied token or jwt has been invalid'))
	.mockReturnValue({ id: '1' });
UserService.get.mockReturnValueOnce(null).mockReturnValue({
	password: '123455',
	_id: '1',
	email: 'test@example.com',
	tel: '000',
});
const next = jest.fn();

const reqFullData = {
	body: {
		username: 'test',
		password: 'test',
	},
	cookies: {
		jwt: 'fake_jwt',
	},
};

const reqMissingData = {
	body: {
		password: 'test',
	},
	cookies: {},
};

const res = {
	send: jest.fn((x) => x),
};

it('for logged in user: will return false (no jwt in cookie)', async () => {
	await isLoggedInUser(null);
	expect(res.send).toHaveBeenCalledTimes(1);
	expect(res.send).toHaveBeenCalledWith('Redirect to login page');
});

it('for logged in user: will send to login page (token is in blacklist or has been invalid)', async () => {
	await isLoggedInUser(reqMissingData, res, next);
	expect(res.send).toHaveBeenCalledTimes(1);
	expect(res.send).toHaveBeenCalledWith('Redirect to login page');
});

it('for logged in user: will send to login page (user belongs to token not exists)', async () => {
	await isLoggedInUser(reqMissingData, res, next);
	expect(res.send).toHaveBeenCalledTimes(1);
	expect(res.send).toHaveBeenCalledWith('Redirect to login page');
});
