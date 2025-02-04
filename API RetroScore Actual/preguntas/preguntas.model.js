const mongoose = require('mongoose');

const PreguntaSchema = new mongoose.Schema({
    pregunta: { type: String, required: true },
    resposta: { type: String, default: null }
});

module.exports = mongoose.model('Pregunta', PreguntaSchema);