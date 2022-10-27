const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const bcrypt = require('bcryptjs');
const { userService, redisService } = require('../services');
const catchAsync = require('../utils/catchAsync');

const generateToken = async (id) => {
    return await promisify(jwt.sign)({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const isValidToken = async (token) => {
    const isInBlacklist = await redisService.get(`bl_${token}`);

    if (isInBlacklist) {
        return new Error(`Denied token: ${token}`);
    }

    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        return err || decoded;
    });
};

const sendToken = async (user, res) => {
    const token = await generateToken(user._id.toString());

    const cookieOptions = {
        expires: new Date(Date.now() + 60 * 1000 * 60 * 24), // 24h
    };

    res.cookie('jwt', token, cookieOptions);
    res.redirect('/');
};

const isLoggedInUser = async (token) => {
    if (!token) return false;

    // check whether the token is in blacklist or has been modified
    const result = await isValidToken(token);

    if (result instanceof Error) {
        return false;
    }

    const { id } = result;

    // check whether student belongs to this id is still exists
    const user = await userService.get({ _id: id }, 'fullname');

    if (!user) {
        return false;
    }

    return user;
};

const authController = {
    view: (req, res, next) => {
        const error = req.flash('error') || '';
        res.render('login', { title: 'Login', error });
    },
    login: catchAsync(async (req, res, next) => {
        const { username, password } = req.body;

        const user = await userService.get(
            { username },
            'password fullname email tel'
        );

        if (!user || !(await bcrypt.compare(password, user.password))) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/auth/login');
        }

        await sendToken(user, res);
    }),
    logout: (req, res, next) => {
        const token = req.user.token;

        res.clearCookie('jwt');
        redisService.set(`bl_${token}`, token);

        res.redirect('/');
    },
    forLoggedIn: catchAsync(async (req, res, next) => {
        const token = req.cookies.jwt;

        const user = await isLoggedInUser(token);

        if (!user) {
            return res.redirect('/auth/login');
        }

        user.token = token;
        req.user = user;

        next();
    }),
    forAnonymous: catchAsync(async (req, res, next) => {
        const token = req.cookies.jwt;

        if (await isLoggedInUser(token)) {
            return res.redirect('/');
        }

        return next();
    }),
};

module.exports = authController;
