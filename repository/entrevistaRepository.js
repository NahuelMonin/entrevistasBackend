const mongoose = require('mongoose');

const EntrevistaModel = require('../models/entrevista');

const findAll = async() => {
    let entrevistas = await EntrevistaModel.find().lean(true);
    return entrevistas;
}
const crearEntrevista = async (entrevista) => {
    const resultado = new EntrevistaModel(entrevista);
    await resultado.save();
}

const eliminarPorId = async (id) => {
    await EntrevistaModel.deleteOne({_id : mongoose.Types.ObjectId(id)});
}

const editarPorId = async (id, entrevista) => {
    await EntrevistaModel.updateOne({_id : mongoose.Types.ObjectId(id)},
        {
            $set: {
                nombreEntrevistado: entrevista.nombreEntrevistado,
                fecha: entrevista.fecha,
                realizada: entrevista.realizada
            }
        }
    );
}

module.exports = {findAll, crearEntrevista, eliminarPorId, editarPorId} ;