const express = require('express')
const auth = require('./auth')

module.exports = function(server){

    //Rotas Abertas
    const openAPI = express.Router()
    server.use('/oapi', openAPI)

    const AuthService = require('../api/user/authService')
    openAPI.post('/login', AuthService.login)
    openAPI.post('/signup', AuthService.signup)
    openAPI.post('/validateToken', AuthService.validateToken)

    //API routes
    const apiProtegida = express.Router()
    server.use('/api', apiProtegida) //Com o router chamado aqui, os metodos abaixo só funcionaram se conter o /api

    apiProtegida.use(auth)

    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(apiProtegida, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    apiProtegida.route('/billingSumary').get(billingSummaryService.getSummary)
}