import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { NegocioFavoritoDTO } from '../../dto/NegocioFavoritoDTO';

@Component({
  selector: 'app-lista-favoritos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.scss']
})
export class ListaFavoritosComponent {

  itemNegocioDTO: ItemNegocioDTO;
  favoritos: NegocioDTO[] = [];

  constructor(private router: Router, private negociosService:NegociosService, private tokenService:TokenService, private clienteService:ClienteService){
    this.itemNegocioDTO = new ItemNegocioDTO();
    clienteService.listarNegociosFavoritos(tokenService.getId()).subscribe({
      next:(data) => {
        this.favoritos = data.respuesta;
        console.log("Negocios recomendados listados: ", data);
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    })
  }

  verDetalles(favorito: NegocioDTO) {
    this.router.navigate(["/informacion-negocio",favorito.codigo]).then(() => {
      window.location.reload();
    });
    console.log(`Ver detalles de ${favorito.nombre}`);
  }

  quitarFavorito(favorito: NegocioDTO) {
    // Lógica para quitar el favorito seleccionado
    const negocioFavoritoDTO:NegocioFavoritoDTO = new NegocioFavoritoDTO(this.tokenService.getId(),
    favorito.codigo);
    this.clienteService.quitarFavoritos(negocioFavoritoDTO).subscribe({
      next: (data) => {
        console.log("Sequitó como favorito.. correctamente");
        const index = this.favoritos.indexOf(favorito);
        if (index !== -1) {
          this.favoritos.splice(index, 1);
        }
      },
      error: (error) => {
        console.log("Error al registrar el favorito");
      }
    });

  }
}
