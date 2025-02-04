export interface Pregunta {
    _id: string;
    pregunta: string;
    resposta: string | null;
    nuevaRespuesta?: string;  // Propiedad temporal para manejar la respuesta en el frontend
  }