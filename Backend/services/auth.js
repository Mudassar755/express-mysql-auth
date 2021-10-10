const jwt = require('jsonwebtoken')
const User = require('../models').user
const bcrypt = require('bcrypt')
const { comparePassword } = require('./encryption')
const { isAdmin } = require('./helpers')

const authRequest = (req, res, next) => {
    if(!req.headers.authorization) {
        next()
        return
    }

    try {
        const token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if(payload)
                req.user = payload

            next()
        })
    } catch(err) {
        next()
    }
}

const authWall = async (req, res, next) => { 
    if(!req.user)
        return next({
            error: "authentication failed"
        })

    let user = await User.findOne({where: {id: req.user.id}})
    if(!user)
      return next({
        error: "authentication failed"
      })
    req.user = user
    next()
}


const authUser = (email, password) => new Promise(async (resolve, reject) => {
    let user = await User.unscoped().findOne({where: {email}})
    if(!user) {
        reject({error: "User not found"})
        return
    }

    try {
        let match = await comparePassword(password, user.password)
        if(match)
            resolve(user)
        else
            reject({error: "Wrong Password"})
    } catch(err) {
        console.log(err)
        reject({error: "Wrong Password"})
    }
})

const getAuthToken = (data) => jwt.sign(data, process.env.JWT_KEY)

module.exports = {
    authRequest,
    authUser,
    getAuthToken,
    authWall,
}
