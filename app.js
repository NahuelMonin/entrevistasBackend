const express = require('express');
const initDB = require('./config/db')
const cors = require('cors');
const app = express();
const port = 6000;
const controller = require('./controllers/controller');

app.use(cors());
app.use(express.urlencoded({ extended: false })); //Permite recibir datos en el body del request.
app.use(express.json({ extended: true }));

app.use('/' , controller);

app.get('/api/entrevistas', controller);

app.listen(port, () => { console.log("==================================\nServer iniciado en el puerto: " + port); });

initDB();

module.exports = app;