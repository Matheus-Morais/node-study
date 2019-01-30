const BillingCycle = require('./billingCycle')
const _ = require('lodash')

BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({new: true, runValidators: true}) 
//new é usado para toda vez que ouver uma atualização é enviado como resultado da atualização, o novo objeto
//runValidators é usado para que seja realizada verificação dos componentes na hra da atuaçlização. ex: se é realmente string ou number 

BillingCycle.after('post', sendErrorsOrNext).after('put', sendErrorsOrNext)

function sendErrorsOrNext(req, res, next){
    const bundle = res.locals.bundle

    if(bundle.errors){
        var errors = parseErrors(bundle.errors)
        res.status(500).json({errors})
    }
    else{
        next()
    }
}

function parseErrors(restErrors){
    const errors = []
    _.forIn(restErrors, error => errors.push(error.message))
    return errors
}

BillingCycle.route('count', function(req, res, next){
    BillingCycle.count(function(error, value){
        if(error){
            res.status(500).json({errors: [error]})
        }
        else{
            res.json({value})
        }
    })
})

module.exports = BillingCycle