const express = require('express');
const router = express.Router();
// const models = require('../models')
// const User = models.user
// const { check } = require('express-validator');
const { validateRequest } = require('../services/helpers')
const authService = require('../services/auth')
const { comparePassword } = require('../services/encryption')
const _ = require('lodash');
const auth = require('../middleware/auth');
const { check, validationResult } = require("express-validator");
const jwt = require('jsonwebtoken')
const User = require('../models').user
const bcrypt = require('bcryptjs')
/**
 * User authentication local
 */
router.post('/local', [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {
        email,
        password
    } = req.body
    let user = await User.unscoped().findOne({ where: { email } })

    if (!user) {
        return res
            .status(400)
            .json({ errors: [{ msg: "User does not exist" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res
            .status(400)
            .json({ errors: [{ msg: "Email or Password is incorrect" }] });
    }
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        process.env.JWT_KEY,
        { expiresIn: '24h' },
        (err, token) => {
            if (err) throw err;
            res.json({ token, user });
        }
    );

    // token = authService.getAuthToken(_.pick(user, ['id', 'email', 'role_id']))
    // res.json({
    //     name: user.name,
    //     email: user.email,
    //     token: token
    // })
});

/**
 * Create new user
 */
router.post('/register', [
    check('email').isEmail(),
    check('password').isLength({ min: 3 })
], async (req, res, next) => {
    const errors = validationResult(req);
    //need to understand
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    // let user = await User.unscoped().findOne({ where: { email } })
    // // let user = await User.findOne({
    // //     where: {email}
    // // })
    // if (user) {
    //     res.status(400).json({ error: 'User with that email already exists' })
    //     return
    // }
    try {
        let user = await User.unscoped().findOne({ where: { email } })

        if (user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "User already exist" }] });
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await User.create({
            name: name,
            email: email,
            password: password,
        })

        const payload = {
            user: {
                email: user.email
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_KEY,
            { expiresIn: '24h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
     
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

    // user = await User.create({
    //     name: name,
    //     email: email,
    //     password: password,
    // })
    // token = authService.getAuthToken(_.pick(user, ['id', 'email']))
    // res.json({
    //     name: user.name,
    //     email: user.email,
    //     token: token
    // })
})
router.get("/", auth, async (req, res) => {
    // req.session.destroy();
    console.log(req.user)
    try {
      const user = await User.findOne({where: {email: req.user.email}})
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });
// router.get('/', auth, async (req, res, next) => {
//     const users = await User.findAll()

//     if (!users)
//         return res.status(400).json({ error: 'users not found' })

//     return res.json(users)
// })

module.exports = router
