import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Negocio {
  nombre: string;
  tipoNegocio: string;
  imagenDestacada: string;
  calificacionPromedio: number;
  descripcion: string;
}

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-recomendados.component.html',
  styleUrls: ['./lista-recomendados.component.scss']
})
export class ListaRecomendadosComponent {
  negocios: Negocio[] = [
    {
      nombre: 'Restaurante La Huerta',
      tipoNegocio: 'Restaurante',
      imagenDestacada: 'https://picsum.photos/100',
      calificacionPromedio: 4.8,
      descripcion: 'Deliciosa comida casera preparada con ingredientes frescos y locales.'
    },
    {
      nombre: 'Boutique Chic',
      tipoNegocio: 'Ropa y Accesorios',
      imagenDestacada: 'https://picsum.photos/100',
      calificacionPromedio: 4.2,
      descripcion: 'Prendas de moda y accesorios de alta calidad al mejor precio.'
    },
    {
      nombre: 'Spa Relajante',
      tipoNegocio: 'Spa y Bienestar',
      imagenDestacada: 'https://picsum.photos/100',
      calificacionPromedio: 4.9,
      descripcion: 'Experiencia de relajación y bienestar con tratamientos personalizados.'
    }
  ];

  constructor(private router: Router)
  {

  }

  verNegocio(negocio: Negocio): void {
    // Aquí puedes agregar la lógica para ver el detalle del negocio
    this.router.navigate(["/informacion-negocio"]).then(() => {
      window.location.reload();
    });
  }
}
