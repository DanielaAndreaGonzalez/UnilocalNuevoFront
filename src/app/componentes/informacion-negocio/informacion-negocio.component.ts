import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NegociosService } from '../../servicios/negocios.service';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { Comentario } from '../../dto/Comentario';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { RegistroComentarioDTO } from '../../dto/RegistroComentarioDTO';
import { DetalleClienteDTO } from '../../dto/DetalleClienteDTO';
import { NegocioFavoritoDTO } from '../../dto/NegocioFavoritoDTO';

@Component({
  selector: 'app-informacion-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './informacion-negocio.component.html',
  styleUrls: ['./informacion-negocio.component.css']
})
export class InformacionNegocioComponent implements OnInit {
  codigoNegocio: string;
  isFavorito:boolean= false;
  propietarioNegocio : DetalleClienteDTO;
  newComment!:RegistroComentarioDTO;

  negocio!: NegocioDTO;
  calificacionPromedio: number = 0;

  constructor(private route: ActivatedRoute, private negociosService: NegociosService, private tokenService:TokenService,
    private clienteService:ClienteService
  ) {
    this.codigoNegocio = '';
    this.newComment = new RegistroComentarioDTO('','','',new Date,0);
    this.propietarioNegocio = new DetalleClienteDTO('','','', '', '', '');
  }

  ngOnInit() {
    const codigo = this.route.snapshot.paramMap.get('idNegocio');
    if (codigo !== null) {
      this.codigoNegocio = codigo;
    }

    // O usando una suscripción si esperas que el parámetro pueda cambiar
    this.route.paramMap.subscribe(params => {
      const codigo = this.route.snapshot.paramMap.get('idNegocio');
      if (codigo !== null) {
        this.codigoNegocio = codigo;
      }
    });
    console.log("Codigo negocio recuperado de la URL: ",this.codigoNegocio);
    this.getInfoNegocio(this.codigoNegocio);
    this.getCalificacionPromedio(this.codigoNegocio);
  }

  addComment() {
    this.newComment.codigoCliente = this.tokenService.getId();
    this.newComment.codigoNegocio = this.codigoNegocio;
    if (this.newComment.codigoCliente && this.newComment.calificacion && this.newComment.mensaje) {
      console.log("Cometario a crear: ",this.newComment);
      this.clienteService.crearComentario(this.newComment).subscribe({
        next: (data) => {
          console.log("Comentario registrado");
        },
        error: (error) => {
          console.log("Error al registrar el comentario");
        }
      });
    }
  }

  getInfoNegocio(codigoNegocio : string ){
      this.negociosService.obtener(codigoNegocio).subscribe({
        next:(data) => {
          this.negocio = data.respuesta;
          this.getInfoPropietarioNegocio(this.negocio.codigoCliente);
        },
        error: (error) => {
          console.log("Error al cargar el negocio ");
        }
      })
  }

  getCalificacionPromedio(codigoNegocio: string){
    this.negociosService.obtenerCalificacionPromedio(codigoNegocio).subscribe({
      next:(data) => {
        this.calificacionPromedio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar la calificacion promedio ", error);
      }
    })
  }

  getInfoPropietarioNegocio(codigoPropietario: string){
    this.clienteService.obtener(codigoPropietario).subscribe({
      next:(data) => {
        this.propietarioNegocio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar la calificacion promedio ", error);
      }
    })
  }

  agregarFavorito(option:boolean){
    if(option){
      const negocioFavoritoDTO:NegocioFavoritoDTO = new NegocioFavoritoDTO(this.tokenService.getId(),
      this.negocio.codigo);
      this.clienteService.agregarFavoritos(negocioFavoritoDTO).subscribe({
        next: (data) => {
          console.log("Agregado a favorito.. correctamente");
          this.isFavorito = true;
        },
        error: (error) => {
          console.log("Error al registrar el favorito");
        }
      });
    }else{
      const negocioFavoritoDTO:NegocioFavoritoDTO = new NegocioFavoritoDTO(this.tokenService.getId(),
          this.negocio.codigo);
        this.clienteService.quitarFavoritos(negocioFavoritoDTO).subscribe({
          next: (data) => {
            console.log("Sequitó como favorito.. correctamente");
            this.isFavorito = false;
          },
          error: (error) => {
            console.log("Error al registrar el favorito");
          }
        });
    }
  }
}
