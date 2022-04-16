const entrevistaRepository = require('../repository/entrevistaRepository');

const buscarTodas = async () => {
    return await entrevistaRepository.findAll();
}

const crearEntrevista = async (entrevista) => {
    await entrevistaRepository.crearEntrevista(entrevista);
}

const eliminarPorId = async (id) => {
    await entrevistaRepository.eliminarPorId(id);
}

const editarPorId = async (id, entrevista) => {
    await entrevistaRepository.editarPorId(id, entrevista);
}
module.exports = {buscarTodas, crearEntrevista, eliminarPorId, editarPorId};