const express = require('express');
const router = express.Router();
const preguntaController = require('./preguntas.controllers.js');

// Definir rutas
router.post('/', preguntaController.crearPregunta);
router.put('/:id', preguntaController.responderPregunta);
router.post('/obtener', preguntaController.obtenerPreguntas);

// Exportar correctamente
module.exports = router;
