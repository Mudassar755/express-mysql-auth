const jwt = require('jsonwebtoken');
// const config = require('config');
// const User = require('../models/User');

module.exports = async function (req, res, next) {
    //Get Token from header
    const token = req.header('x-auth-token');
    console.log("tokennn", token)
    
    //Check if tken
    if (!token) {
        res.status(400).json({ msg: 'No token, Autherization denied' })
        return
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        console.log("req.decoded", decoded)
        req.user = decoded.user;
        console.log("req.userrrr", req.user)
        next();
    } catch (err) {
        res.status(200).json({ msg: 'Token is not valid' })
    }
}