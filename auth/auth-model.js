const db = require('../data/dbConfig');

function register(user){
    return db('users').insert(user)
}

function login(userName){
    return db('users').where({userName: userName})
}

module.exports = {
    register,
    login,
}