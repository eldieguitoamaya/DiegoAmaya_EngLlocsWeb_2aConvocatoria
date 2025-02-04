const Pregunta = require('./preguntas.model.js');

// Crear una nueva pregunta
exports.crearPregunta = async (req, res) => {
    try {
        const { pregunta } = req.body;
        const nuevaPregunta = new Pregunta({ pregunta });
        await nuevaPregunta.save();
        res.status(201).json(nuevaPregunta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la pregunta' });
    }
};

// Responder a una pregunta existente
exports.responderPregunta = async (req, res) => {
    try {
        const { id } = req.params;
        const { resposta } = req.body;
        const pregunta = await Pregunta.findByIdAndUpdate(id, { resposta }, { new: true });
        if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
        res.json(pregunta);
    } catch (error) {
        res.status(500).json({ error: 'Error al responder la pregunta' });
    }
};

// Obtener todas las preguntas o solo las que no tienen respuesta
exports.obtenerPreguntas = async (req, res) => {
    try {
        const { preguntes_per_respondre } = req.query;
        const filtro = preguntes_per_respondre ? { resposta: null } : {};
        const preguntas = await Pregunta.find(filtro);
        res.json(preguntas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las preguntas' });
    }
};
