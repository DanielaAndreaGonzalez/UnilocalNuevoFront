import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-pendientes-moderador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-pendientes-moderador.component.html',
  styleUrls: ['./lista-pendientes-moderador.component.css']
})
export class ListaPendientesModComponent implements OnInit {
  businesses = [
    { id: 1, name: 'Luisa', description: 'HOTEL CAMPRESTRE \nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.', comment: '' },
    { id: 2, name: 'Daniela', description: 'RESTAURANTE \n.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.', comment: '' },
    { id: 3, name: 'Leidy', description: 'CAFE \tLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.', comment: '' }
  ];

  constructor() {}

  ngOnInit(): void {}

  approve(id: number, comment: string) {
    // Aquí normalmente se enviaría la solicitud HTTP, pero como no estamos usando servicios HTTP, lo omitimos.
    console.log(`Aprobación del negocio con ID ${id} y comentario: ${comment}`);
    alert('Negocio aprobado');
  }

  reject(id: number, comment: string) {
    // Aquí normalmente se enviaría la solicitud HTTP, pero como no estamos usando servicios HTTP, lo omitimos.
    console.log(`Rechazo del negocio con ID ${id} y comentario: ${comment}`);
    alert('Negocio rechazado');
  }
}
