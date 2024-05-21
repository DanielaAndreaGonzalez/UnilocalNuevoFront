import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-recomendados',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertaComponent],
  templateUrl: './lista-recomendados.component.html',
  styleUrls: ['./lista-recomendados.component.scss']
})
export class ListaRecomendadosComponent {
  alerta!:Alerta;
  negocios: NegocioDTO[] = [];

  constructor(private router: Router, private negociosService:NegociosService, private tokenService:TokenService)
  {
    negociosService.listarNegociosPropietario(tokenService.getId()).subscribe({
      next:(data) => {
        this.negocios = data.respuesta;
        console.log("Negocios recomendados listados: ", data);
      },
      error: (error) => {
        if (error.status === 400) {
          this.alerta = new Alerta('Error de conexión', 'danger');
        } else {
          if (error.error && error.error.respuesta) {
            this.alerta = new Alerta(error.error.respuesta, 'danger');
          } else {
            this.alerta = new Alerta('Se produjo un error, por favor verifica tus datos o intenta más tarde.', 'danger');
          }
        }
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
