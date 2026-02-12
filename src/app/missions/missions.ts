import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

interface Mission {
  title: string;
  difficulty: string;
  description: string;
}

@Component({
  selector: 'app-missions',
  imports: [NgClass],
  template: `
    <div class="container mt-5">
      <h2 class="mb-4 text-center fw-bold text-uppercase">📂 Misiones Clasificadas</h2>

      <div class="row">
        @for (mission of missions(); track mission.title) {
          
          <div class="col-md-6 col-lg-4 mb-4">
            <div class="card h-100 shadow-sm border-dark">
              
              <div class="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <span class="fw-bold">CONFIDENCIAL</span>
                <span class="badge rounded-pill" [ngClass]="getBadgeColor(mission.difficulty)">
                  {{ mission.difficulty }}
                </span>
              </div>

              <div class="card-body bg-light">
                <h5 class="card-title fw-bold text-primary">{{ mission.title }}</h5>
                <hr>
                <p class="card-text text-muted">{{ mission.description }}</p>
              </div>

              <div class="card-footer bg-transparent border-top-0 text-end">
                <button class="btn btn-outline-dark btn-sm">Ver Detalles</button>
              </div>

            </div>
          </div>

        } @empty {
          <div class="col-12">
            <div class="alert alert-warning text-center" role="alert">
              <i class="bi bi-exclamation-triangle-fill"></i>
              No hay misiones asignadas o no tienes el nivel de autorización requerido.
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    /* Un pequeño ajuste para que las cards resalten al pasar el ratón */
    .card { transition: transform 0.2s; }
    .card:hover { transform: translateY(-5px); }
  `]
})
export class Missions {
  private http = inject(HttpClient);
  
  // Signal para almacenar las misiones
  missions = signal<Mission[]>([]);

  constructor() {
    // La petición GET se hace automáticamente al cargar el componente.
    // El AuthInterceptor inyectará el token aquí.
    this.http.get<Mission[]>('http://localhost:3001/missions')
      .subscribe({
        next: (data) => this.missions.set(data),
        error: (err) => console.error('Error cargando misiones:', err)
      });
  }

  // Helper para devolver la clase de Bootstrap según la dificultad
  getBadgeColor(difficulty: string): string {
    switch (difficulty) {
      case 'Baja': return 'text-bg-success';      // Verde
      case 'Media': return 'text-bg-warning';     // Amarillo
      case 'Alta': return 'text-bg-danger';       // Rojo
      case 'Imposible': return 'text-bg-dark';    // Negro
      default: return 'text-bg-secondary';        // Gris
    }
  }
}
