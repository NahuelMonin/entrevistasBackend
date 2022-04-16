const entrevistaService = require('../../services/entrevistaService');
const request = require('supertest');
const router = require('../../controllers/controller');
const express = require('express');
const { default: mongoose } = require('mongoose');
const entrevista = require('../../models/entrevista');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

jest.mock('../../services/entrevistaService', () => ({
    __esModule: true,
    eliminarPorId: jest.fn(),
    editarPorId: jets.fn()
}));

describe('Tests del controller', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })
    test("home route works", done => {
        request(app)
          .get("/home")
          .expect("Soy un controller")
          .expect(200, done);
      });
    
    test('Request DELETE /api/eliminar/:id call entrevistaService.eliminarPorId', async () => {
      
      const id = "2"
      
      await request(app).delete(`/api/eliminar/${id}`).
      expect("Se elimino la entrevista").
      expect(200);
      expect(entrevistaService.eliminarPorId).toBeCalledTimes(1);
      expect(entrevistaService.eliminarPorId).toBeCalledWith(id);
    })
    
    test ('Request DELETE /api/eliminar/:id returns error', async () => {
        jest.spyOn(entrevistaService, 'eliminarPorId').mockImplementationOnce(() => Promise.reject());
        const id = '2'

        await request(app).delete(`/api/eliminar/${id}`)
        .expect("hubo un error")
        .expect(500);
        expect(entrevistaService.eliminarPorId).toBeCalledWith(id);
        expect(entrevistaService.eliminarPorId).toBeCalledTimes(1);
    })

    test('Request PUT /api/editar/:id call entrevistaService.editarPorId', async () => {
      
        const id = 2;
        const idValido = {_id: mongoose.Types.ObjectId(id)};
        const payloadPut = {
            nombreEntrevistado: "Nahuel",
            fecha: "25/07/2022 15:30",
            realizada: false
        }
        
        await request(app)
            .put(`/api/editar/${idValido}`)
            .
        expect(entrevistaService.editarPorId).toBeCalledWith(id, payloadPut);
        expect(entrevistaService.editarPorId).toBeCalledTimes(1);
        
      })
})