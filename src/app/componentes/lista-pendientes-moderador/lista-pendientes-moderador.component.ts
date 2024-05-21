import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { ModeradorService } from '../../servicios/moderador.service';
import { ClienteService } from '../../servicios/cliente.service';
import { AutorizarNegocioDTO } from '../../dto/AutorizarNegocioDTO';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-lista-pendientes-moderador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-pendientes-moderador.component.html',
  styleUrls: ['./lista-pendientes-moderador.component.css']
})
export class ListaPendientesModComponent implements OnInit {
  lugaresPendientesAutorizar: NegocioDTO [] = [];
  comentario :string = '';

  constructor(private moderadorService:ModeradorService, private tokenService:TokenService) {}

  ngOnInit(): void {
    this.genociosPendientePorAprobar();
  }

  genociosPendientePorAprobar(){
    this.moderadorService.obtenerLugaresPendientesAutorizar().subscribe({
      next:(data) => {
        this.lugaresPendientesAutorizar = data.respuesta;
        //getInfoCliente(this.)
        console.log("Negocios pendientes de autorizar: ", data);
      },
      error: (error) => {
        console.log("Error al cargar los negocios pendientes por autorizar");
      }
    })
  }
  aprobar(negocioDto:NegocioDTO) {
    const autorizarNegocioDTO:AutorizarNegocioDTO = new AutorizarNegocioDTO(
      negocioDto.codigo,
      negocioDto.codigoCliente,
      negocioDto.comentarioAutororizacion,
      this.tokenService.getId(),
      new Date()
    );

    this.moderadorService.autorizarNegocio(autorizarNegocioDTO).subscribe({
      next:(data) => {
        console.log("Negocios pendientes de autorizar: ", data);
      },
      error: (error) => {
        console.log("Error al cargar los negocios pendientes por autorizar");
      }
    })
  }

  rechazar(negocioDto:NegocioDTO) {
    const autorizarNegocioDTO:AutorizarNegocioDTO = new AutorizarNegocioDTO(
      negocioDto.codigo,
      negocioDto.codigoCliente,
      negocioDto.comentarioAutororizacion,
      this.tokenService.getId(),
      new Date()
    );

    this.moderadorService.rechazarNegocio(autorizarNegocioDTO).subscribe({
      next:(data) => {
        this.genociosPendientePorAprobar();
        console.log("Negocios pendientes de autorizar: ", data);
      },
      error: (error) => {
        console.log("Error al cargar los negocios pendientes por autorizar");
      }
    })
  }
}
