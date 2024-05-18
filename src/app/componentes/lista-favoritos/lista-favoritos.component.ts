import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';



interface Favorito {
  nombre: string;
  descripcion: string;
  imagenURL: string;
}

@Component({
  selector: 'app-lista-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.scss']
})
export class ListaFavoritosComponent {

  itemNegocioDTO: ItemNegocioDTO;
  favoritos: Favorito[] = [
    {
      nombre: 'Restaurante La Huerta',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      imagenURL: 'https://picsum.photos/200/300'
    },
    {
      nombre: 'Hotel Panorama',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      imagenURL: 'https://picsum.photos/200/300'
    },
    {
      nombre: 'Spa Relajante',
      descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget elit nec neque auctor aliquam.',
      imagenURL: 'https://picsum.photos/200/300'
    }
  ];

  constructor(private router: Router){
    this.itemNegocioDTO = new ItemNegocioDTO();
  }

  verDetalles(favorito: Favorito) {
    this.router.navigate(["/informacion-negocio",this.itemNegocioDTO.codigoNegocio]).then(() => {
      window.location.reload();
    });
    console.log(`Ver detalles de ${favorito.nombre}`);
  }

  quitarFavorito(favorito: Favorito) {
    // Lógica para quitar el favorito seleccionado
    const index = this.favoritos.indexOf(favorito);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
    }
  }
}
