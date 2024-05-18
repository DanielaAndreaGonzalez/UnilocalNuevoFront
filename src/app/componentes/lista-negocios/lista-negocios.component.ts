import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-negocios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.css']
})
export class ListaNegociosComponent implements OnInit {
  negocios: any[] = [
    { id: 1, nombre: 'Hotel Panorama', activo: true },
    { id: 2, nombre: 'Restaurante La Fogata', activo: true },
    { id: 3, nombre: 'Hotel Café Real', activo: false }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // No se necesita cargar datos de un servicio
  }

  editarNegocio(negocio: any): void {
    this.router.navigate(['/editar-negocio', negocio.id]);

    /*this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });*/
  }

  eliminarNegocio(id: number): void {
    this.negocios = this.negocios.filter(negocio => negocio.id !== id);
    console.log('Negocio eliminado', id);
  }
}
