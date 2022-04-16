const {Router} = require('express');
const router = Router();
const entrevistaService = require('../services/entrevistaService');

router.get('/home' , (req, res) => {
    res.send('Soy un controller');
})

router.get('/api/entrevistas' , async (req, res) => {
    const response = await entrevistaService.buscarTodas();
    res.send(response);
})

router.post('/api/nueva-entrevista' , async (req, res) => {
    try {
        await entrevistaService.crearEntrevista(req.body);
        res.send(req.body).status(200); 
    } 
    catch (error) {
        res.send(error.message).status(500);
    }
})

router.delete('/api/eliminar/:id', async (req, res) => {
    try {
        await entrevistaService.eliminarPorId(req.params.id);
        res.send("Se elimino la entrevista").status(200);
    } catch (error) {
        res.status(500).send("Se produjo un error al intentar eliminar la entrevista");
    }
})

router.put('/api/editar/:id', async (req, res) => {
    try {
        await entrevistaService.editarPorId(req.params.id, req.body.entrevista);
        res.send("Se edito la entrevista").status(200);
    } catch (error) {
        res.status(500).send("Se produjo un error al intentar editar la entrevista");
    }
})

module.exports = router;