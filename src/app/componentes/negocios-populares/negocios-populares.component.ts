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
  selector: 'app-negocios-populares',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './negocios-populares.component.html',
  styleUrls: ['./negocios-populares.component.scss']
})
export class NegociosPopularesComponent {
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

  tiposNegocio: string[] = ['Restaurante', 'Ropa y Accesorios', 'Spa y Bienestar'];
  selectedTipoNegocio: string = '';

  get filteredNegocios(): Negocio[] {
    if (!this.selectedTipoNegocio) {
      return this.negocios;
    }
    return this.negocios.filter(negocio => negocio.tipoNegocio === this.selectedTipoNegocio);
  }

  constructor(private router: Router){}

  verNegocio(negocio: Negocio): void {
    this.router.navigate(["/informacion-negocio"]).then(() => {
      window.location.reload();
    });
  }
}
