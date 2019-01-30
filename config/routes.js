const express = require('express')

module.exports = function(server){

    //API routes

    const router = express.Router()
    server.use('/api', router) //Com o router chamado aqui, os metodos abaixo só funcionaram se conter o /api

    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')

    const billingSummaryService = require('../api/billingSummary/billingSummaryService')
    router.route('/billingSumary').get(billingSummaryService.getSummary)
}