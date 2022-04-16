const mongoose = require('mongoose');

// Creacion de esquema
const EntrevistasSchema = new mongoose.Schema(
    {   
        nombreEntrevistado: {
            type: String
        },
        fecha: {
            type: String
        },
        realizada: {
            type: Boolean
        }    
    }, {versionKey: false}
)

// Exporta un modelo usando el esquema antes diseñado
module.exports = mongoose.model('entrevista', EntrevistasSchema);