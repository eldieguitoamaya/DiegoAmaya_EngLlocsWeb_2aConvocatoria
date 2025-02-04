const express = require('express');
const router = express.Router();
const preguntaController = require('./pregunta.controller');

router.post('/preguntes', preguntaController.crearPregunta);
router.put('/preguntes/:id', preguntaController.responderPregunta);
router.get('/preguntes', preguntaController.obtenerPreguntas);

module.exports = router;
