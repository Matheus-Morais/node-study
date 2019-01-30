const _ = require('lodash')
const BillingCycle = require('../billingCycle/billingCycle')

function getSummary(req, res){
    BillingCycle.aggregate([{
        $project: {credit: {$sum: "$credits.value"}, debit: {$sum: "$debits.value"}} //soma todos os valores de credits e debitis daquele registro
    },{
        $group: {_id: null, credit: {$sum: "$credit"}, debit: {$sum: "$debit"}} //soma todos os valores dos registros em um novo documento com id null
    },{
        $project: {_id: 0, credit: 1, debit: 1} //Retira o id do documento para mostrar só os valores
    }], function(error, result){
        if(error){
            res.status(500).json({erros: [error]}) //se der erro
        }
        else{
            res.json(_.defaults(result[0], {credit:0, debit: 0})) //se não tiver nada a ser somado, o valor exibido sera os creditos e debitos = 0
        }
    })
}

module.exports = { getSummary }