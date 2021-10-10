const express = require('express');
const router = express.Router();
const models = require('../models')
const User = models.user
const { check } = require('express-validator');
const { validateRequest } = require('../services/helpers')
const authService = require('../services/auth')
const { comparePassword } = require('../services/encryption')
const _ = require('lodash')

/**
 * User authentication local
 */
router.post('/local', [
        check('email').isEmail(),
        check('password').isLength({min: 3})
    ], validateRequest, async (req, res, next) => {
    const {
        email,
        password
    } = req.body

    let user;
    try {
        user = await authService.authUser(email, password)
    } catch(err) {
        res.status(400).json(err)
        return
    }

    token = authService.getAuthToken(_.pick(user, ['id', 'email', 'role_id']))
    res.json({
        name: user.name,
        email: user.email,
        token: token
    })
});

/**
 * Create new user
 */
router.post('/register', [
        check('email').isEmail(),
        check('password').isLength({min: 3})
    ], validateRequest, async (req, res, next) => {

    const {
        name,
        email,
        password,
    } = req.body

    let user = await User.findOne({
        where: {email}
    })

    if(user) {
        res.status(400).json({error: 'User with that email already exists'})
        return
    }

        
    user = await User.create({
        name:name,
        email: email,
        password: password,
    })

    res.json(user)
})
router.get('/', async(req, res, next) => {


    const users = await User.find()

    if(!users)
        return res.status(400).json({error: 'users not found'})

    return res.json(users)
})

module.exports = router
