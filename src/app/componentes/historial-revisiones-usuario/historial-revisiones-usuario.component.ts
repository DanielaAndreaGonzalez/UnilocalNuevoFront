import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Revision {
  negocio: string;
  comentario: string;
  estado: 'APROBADO' | 'RECHAZADO';
  fecha: Date;
}

@Component({
  selector: 'app-historial-revisiones-usuario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-revisiones-usuario.component.html',
  styleUrls: ['./historial-revisiones-usuario.component.scss']
})
export class HistorialRevisionesUsaComponent {
  revisiones: Revision[] = [
    {
      negocio: 'Hotel Panorama',
      comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      estado: 'APROBADO',
      fecha: new Date('2024-05-01')
    },
    {
      negocio: 'Hotel Cafe Real',
      comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      estado: 'APROBADO',
      fecha: new Date('2023-04-15')
    },
    {
      negocio: 'Restaurante El Solar',
      comentario: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      estado: 'RECHAZADO',
      fecha: new Date('2023-03-20')
    }
  ];
}