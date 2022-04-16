const entrevistaRepository = require('../../repository/entrevistaRepository');
const EntrevistaModel = require('../../models/entrevista');
const { default: mongoose } = require('mongoose');
describe('Tests de entrevistaRepository', () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    })
    describe ('Test de funcion eliminar', () => {
        test('eliminarPorId_conIdValido_eliminaEntrevistaEnBD', async () => {
            const eliminar = jest.fn();
            jest.spyOn(EntrevistaModel, 'deleteOne').mockImplementationOnce(eliminar);
            const id = 2;
            const idValido = {_id : mongoose.Types.ObjectId(id)};
            
            await entrevistaRepository.eliminarPorId(idValido._id);    
            
            expect(eliminar).toBeCalledWith(idValido);
            expect(eliminar).toBeCalledTimes(1);
        })
        test('eliminarPorId_conIdValido_retornaStatus500', async () => {
            
            jest.spyOn(EntrevistaModel, 'deleteOne').mockImplementationOnce(() => Promise.reject());
            const id = 2;
            const idValido = {_id : mongoose.Types.ObjectId(id)};
            
            try {
            await entrevistaRepository.eliminarPorId(idValido._id);
            
            } catch (error) {
                expect(EntrevistaModel.deleteOne).toBeCalledWith(idValido);
                expect(EntrevistaModel.deleteOne).toBeCalledTimes(1);
            }
        })
    })
    describe ('Tests de funcion editar', () => {
        test('editarPorId_conIdValido_editaEntrevista', async () => {
            const editar = jest.fn();
            jest.spyOn(EntrevistaModel, 'updateOne').mockImplementationOnce(editar);
            const id = 2;
            const idValido = {_id : mongoose.Types.ObjectId(id)};
            const entrevista = {
                nombreEntrevistado: "Nahuel",
                fecha: "25/07/2022 15:00",
                realizada: false
            }
            await entrevistaRepository.editarPorId(idValido._id, entrevista);

            expect(editar).toBeCalledWith(idValido, {$set: {
                nombreEntrevistado: entrevista.nombreEntrevistado,
                fecha: entrevista.fecha,
                realizada: entrevista.realizada
            }});
            expect(editar).toBeCalledTimes(1);
        })

        test('editarPorId_conIdValido_retornaStatus500', async () => {
            
            jest.spyOn(EntrevistaModel, 'updateOne').mockImplementationOnce(() => Promise.reject());
            const id = 2;
            const idValido = {_id : mongoose.Types.ObjectId(id)};
            const entrevista = {
                nombreEntrevistado: "Nahuel",
                fecha: "25/07/2022 15:00",
                realizada: false
            }

            try {
            await entrevistaRepository.editarPorId(idValido._id, entrevista);
            
            } catch (error) {
                expect(EntrevistaModel.updateOne).toBeCalledWith(idValido, {$set: {
                    nombreEntrevistado: entrevista.nombreEntrevistado,
                    fecha: entrevista.fecha,
                    realizada: entrevista.realizada
                }});
                expect(EntrevistaModel.updateOne).toBeCalledTimes(1);
            }
        })
    })
})