
const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456';

const createToken = username => {
    return jwt.sign({username}, JWT_SECRET).toString();
};

module.exports = {createToken};