import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { NegocioDTO } from '../../dto/NegocioDTO';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-recomendados.component.html',
  styleUrls: ['./lista-recomendados.component.scss']
})
export class ListaRecomendadosComponent {
  negocios: NegocioDTO[] = [];

  constructor(private router: Router, private negociosService:NegociosService, private tokenService:TokenService)
  {
    negociosService.listarNegociosPropietario(tokenService.getId()).subscribe({
      next:(data) => {
        this.negocios = data.respuesta;
        console.log("Negocios recomendados listados: ", data);
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    })
  }

  verNegocio(negocio: NegocioDTO): void {
    // Aquí puedes agregar la lógica para ver el detalle del negocio
    this.router.navigate(["/informacion-negocio", negocio.codigo]).then(() => {
      window.location.reload();
    });
  }
}
