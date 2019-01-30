const _ = require('lodash')
const jwt = require('jsonwebtoken')
const User = require('./user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[@#$%]).{6,12})/

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = []
    _.forIn(dbErrors.errors, error => errors.push(error.message))
    return res.status(400).json({errors})
}

const login = (req, res, next) => {
    const email = req.body.email || ''
    const password = req.body.password || ''

    User.findOne({email}, (err, user) =>{
        if(err){
            return sendErrorsFromDB(res, err)
        }
        else if (user && password == user.password){
            const token = jwt.sign(user, env.authSecret, {
                expiresIn: "1 day"
            })
            const {name, email} = user
            res.json({name, email, token})
        }
        else{
            return res.status(400).send({errors: ['Usuario ou senha invalidos!']})
        }
    })
}

const validateToken = (req, res, next) => {
    const token = req.body.token || ''
    jwt.verify(token, env.authSecret, function(err, decoded){
        return res.status(200).send({valid: !err})
    })
}

const signup = (req, res, next) => {
    const name = req.body.name || ''
    const email = req.body.email || ''
    const password = req.body.password || ''
    const confirmPassword = req.body.confirm_password || ''

    // if(!email.match(emailRegex)){
    //     return res.status(400).send({errors: ['O email informado esta invalido']})
    // }
    
    if(!password == confirmPassword){
        return res.status(400).send({errors: ['Senhas não batem.']})
    }

    User.findOne({email}, (err, user) =>{
        if(err){
            return sendErrorsFromDB(res, err)
        }
        else if(user){
            return res.status(400).send({errors: ['Usuario ja cadastrado']})
        }
        else{
            const newUser = new User({name, email, password})
            newUser.save(err => {
                if(err){
                    return sendErrorsFromDB(res, err)
                }
                else{
                    login(req, res, next)
                }
            })
        }
    })
}

module.exports = {login, signup, validateToken}