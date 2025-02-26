import { Component, OnInit } from '@angular/core';
import { ApiService } from '../Services/api.service';
import { Pregunta } from '../models/pregunta';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntas',
  standalone: true,
  templateUrl: './preguntas.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  preguntas: Pregunta[] = [];
  filtrarSinRespuesta: boolean = false;
  nuevaPregunta: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.obtenerPreguntas();
  }

  // Obtener preguntas con o sin respuesta, dependiendo del filtro
  obtenerPreguntas(): void {
    this.apiService.obtenerPreguntas(this.filtrarSinRespuesta).subscribe(
      (preguntas) => {
        this.preguntas = preguntas;
      },
      (error) => {
        console.error('Error al obtener preguntas', error);
      }
    );
  }

  // Crear una nueva pregunta
  crearPregunta(): void {
    if (this.nuevaPregunta.trim()) {
      this.apiService.crearPregunta(this.nuevaPregunta).subscribe(
        (nuevaPregunta) => {
          this.preguntas.push(nuevaPregunta);
          this.nuevaPregunta = ''; // Limpiar el campo
        },
        (error) => {
          console.error('Error al crear pregunta', error);
        }
      );
    }
  }

  // Responder una pregunta existente
  responderPregunta(id: string, respuesta: string): void {
    // Asegurarse de que la respuesta no esté vacía
    if (respuesta.trim()) {
      this.apiService.responderPregunta(id, respuesta).subscribe(
        (preguntaActualizada) => {
          // Actualizamos la pregunta en la lista de preguntas
          const index = this.preguntas.findIndex(p => p._id === id);
          if (index !== -1) {
            this.preguntas[index].resposta = preguntaActualizada.resposta;
          }
        },
        (error) => {
          console.error('Error al responder pregunta', error);
        }
      );
    }
  }
}
