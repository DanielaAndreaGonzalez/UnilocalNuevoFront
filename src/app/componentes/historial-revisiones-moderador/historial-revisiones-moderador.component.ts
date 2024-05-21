import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { ModeradorService } from '../../servicios/moderador.service';
import { TokenService } from '../../servicios/token.service';
import { HistorialModeracionDTO } from '../../dto/HistorialModeracionDTO';


@Component({
  selector: 'app-historial-revisiones-moderador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historial-revisiones-moderador.component.html',
  styleUrls: ['./historial-revisiones-moderador.component.scss']
})
export class HistorialRevisionesModComponent {

  lugares: HistorialModeracionDTO [] = [];

  constructor(private moderadorService :ModeradorService, private tokenService:TokenService) {}

  ngOnInit(): void {
    this.historicoAprobados();
  }

  historicoAprobados(){
    const moderadoId:string = this.tokenService.getId();
    this.moderadorService.obtenerHistoricoLugaresAutorizados(moderadoId).subscribe({
      next:(data) => {
        this.lugares = data.respuesta;
        //getInfoCliente(this.)
        console.log("Negocios pendientes de autorizar: ", data);
      },
      error: (error) => {
        console.log("Error al cargar los negocios pendientes por autorizar");
      }
    })
  }

  historicoRechazados(){
    const moderadoId:string = this.tokenService.getId();
    this.moderadorService.obtenerHistoricoLugaresRechazados(moderadoId).subscribe({
      next:(data) => {
        this.lugares = data.respuesta;
        //getInfoCliente(this.)
        console.log("Negocios pendientes de autorizar: ", data);
      },
      error: (error) => {
        console.log("Error al cargar los negocios pendientes por autorizar");
      }
    })
  }
}
