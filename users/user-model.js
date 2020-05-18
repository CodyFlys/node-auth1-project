const db = require('../data/dbConfig');

function get(){
    return db('users')
}

function post(newUser){
    return db('users').insert(newUser)
}

module.exports = {
    get
}