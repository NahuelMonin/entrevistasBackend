const entrevistaService = require('../../services/entrevistaService');
const entrevistaRepository = require('../../repository/entrevistaRepository');
const { default: mongoose } = require('mongoose');

describe('Tests del entrevistaService', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })
    test('eliminarPorId_conIdValido_eliminaEntrevistaDeDB', () => {
        const eliminar = jest.fn();
        jest.spyOn(entrevistaRepository, 'eliminarPorId').mockImplementationOnce(eliminar);
        const id = 2;
        const idValido = {_id : mongoose.Types.ObjectId(id)};

        entrevistaService.eliminarPorId(idValido);

        expect(eliminar).toBeCalledWith(idValido)
        expect(eliminar).toBeCalledTimes(1);
    })
    test('eliminarPorId_conIdValido_retornaStatus500', async () => {
        
        jest.spyOn(entrevistaRepository, 'eliminarPorId').mockImplementationOnce(() => Promise.reject());
        const id = 2;
        const idValido = {_id : mongoose.Types.ObjectId(id)};

        try {
            await entrevistaService.eliminarPorId(idValido);
        } catch (error) {
            expect(entrevistaRepository.eliminarPorId).toBeCalledWith(idValido);
            expect(entrevistaRepository.eliminarPorId).toBeCalledTimes(1);
        }
    })
    test('editarPorId_conIdValido_editaEntrevista', async () => {
        const editar = jest.fn();
        jest.spyOn(entrevistaRepository, 'editarPorId').mockImplementationOnce(editar);
        const id = 2;
        const idValido = {_id : mongoose.Types.ObjectId(id)};
        const entrevista = {
            nombreEntrevistado: "Nahuel",
            fecha:"25/05/2022 15:30",
            realizada: false
        }
        
        await entrevistaService.editarPorId(idValido._id, entrevista);

        expect(editar).toBeCalledWith(idValido._id, entrevista);
        expect(editar).toBeCalledTimes(1);
    });

    test('editarPorId_conIdValido_retornaStatus500', async () => {
            
        jest.spyOn(entrevistaRepository, 'editarPorId').mockImplementationOnce(() => Promise.reject());
        const id = 2;
        const idValido = {_id : mongoose.Types.ObjectId(id)};
        const entrevista = {
            nombreEntrevistado: "Nahuel",
            fecha: "25/07/2022 15:00",
            realizada: false
        }

        try {
        await entrevistaService.editarPorId(idValido, entrevista);
        
        } catch (error) {
            expect(entrevistaRepository.editarPorId).toBeCalledWith(idValido, entrevista);
            expect(entrevistaRepository.editarPorId).toBeCalledTimes(1);
        }
    })

})