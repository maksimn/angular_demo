
const jwt = require('jsonwebtoken');

const JWT_SECRET = '123456';

export const createToken = (username: string) : string => {
    return jwt.sign({username}, JWT_SECRET).toString();
};