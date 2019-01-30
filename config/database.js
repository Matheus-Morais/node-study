const mongoose = require('mongoose')

module.export = mongoose.connect('mongodb://localhost/db_finance', { useNewUrlParser: true })

//Forma padrão de mudar a forma como as mensagens são apresentadas
mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório."
mongoose.Error.messages.Number.min = "O '{VALUE}' informado é menor que o limite mínimo de '{MIN}' ."
mongoose.Error.messages.Number.max = "O '{VALUE}' informado é maior que o limite maximo de '{MAX}' ."
mongoose.Error.messages.String.enum = "'{VALUE}' não é valido para o atributo '{PATH}'"
