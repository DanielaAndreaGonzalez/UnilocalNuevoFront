import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-lista-negocios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-negocios.component.html',
  styleUrls: ['./lista-negocios.component.css']
})
export class ListaNegociosComponent implements OnInit {
  negocios: NegocioDTO[] = [];

  constructor(private router: Router, private negociosService:NegociosService, private tokenService:TokenService){}

  ngOnInit(): void {
    // No se necesita cargar datos de un servicio
    this.getNegocios();
  }

  editarNegocio(negocio: NegocioDTO): void {
    this.router.navigate(['/editar-negocio', negocio.codigo]);

    /*this.router.navigate(["/"]).then(() => {
      window.location.reload();
    });*/
  }

  nuevoNegocio(){
    this.router.navigate(['/crear-negocio']);

  }

  eliminarNegocio(id: string): void {
    this.negociosService.eliminar(id).subscribe({
      next:(data) => {
        console.log("Negocio eliminado", data);
      },
      error: (error) => {
        console.log("Error al eliminar el negocio");
      }
    })
  }

  getNegocios(){
    this.negociosService.listarNegociosPropietario(this.tokenService.getId()).subscribe({
      next:(data) => {
        this.negocios = data.respuesta;
        console.log("Negocios recomendados listados: ", data);
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    })
  }
}
