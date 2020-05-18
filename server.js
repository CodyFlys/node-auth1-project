const express = require('express');

const usersRouter = require('./users/userRouter'); // find our router
const authRouter = require('./auth/authRouter');
const session = require('express-session');

const server = express();

const sessionConfig = {
    name: 'monkey', // default if not specified is sid
    secret: 'keep it secret, keep it safe!', // should be saved in a environment variable in production
    cookie: {
        maxAge: 1000 * 30,
        secure: false, // should be true in production
        httpOnly: true // ALWAYS true. means it can't be accessed from JS code.
    },
    reasve: false,
    saveUninitialized: false, // GDPR laws against setting cookies automatically, check this first!
}

server.use(express.json());
server.use(session(sessionConfig))
server.use('/api/users', usersRouter); // set our endpoint to use the router
server.use('/api', authRouter);

module.exports = server;