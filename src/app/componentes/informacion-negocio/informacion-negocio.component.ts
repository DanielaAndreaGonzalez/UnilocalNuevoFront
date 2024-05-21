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
import { AlertaComponent } from '../alerta/alerta.component';
import { Alerta } from '../../dto/alerta';

@Component({
  selector: 'app-informacion-negocio',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertaComponent],
  templateUrl: './informacion-negocio.component.html',
  styleUrls: ['./informacion-negocio.component.css']
})
export class InformacionNegocioComponent implements OnInit {
  alerta!:Alerta;
  alertFavorito!:Alerta;
  codigoNegocio: string;
  isFavorito: boolean = false;
  propietarioNegocio: DetalleClienteDTO;
  newComment: RegistroComentarioDTO;

  negocio!: NegocioDTO;
  calificacionPromedio: number = 0;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private clienteService: ClienteService
  ) {
    this.codigoNegocio = '';
    this.newComment = new RegistroComentarioDTO('', '', '', new Date(), 0);
    this.propietarioNegocio = new DetalleClienteDTO('', '', '', '', '', '');
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
    console.log("Codigo negocio recuperado de la URL: ", this.codigoNegocio);
    this.getInfoNegocio(this.codigoNegocio);
    this.getCalificacionPromedio(this.codigoNegocio);
  }

  addComment() {
    this.newComment.codigoCliente = this.tokenService.getId();
    this.newComment.codigoNegocio = this.codigoNegocio;
    if (this.newComment.codigoCliente && this.newComment.calificacion && this.newComment.mensaje) {
      console.log("Cometario a crear: ", this.newComment);
      this.clienteService.crearComentario(this.newComment).subscribe({
        next: (data) => {
          this.alerta = new Alerta('Comentario agregado con exito!', 'success');
          this.newComment = new RegistroComentarioDTO('', '', '', new Date(), 0); // Resetear comentario
          this.getInfoNegocio(this.codigoNegocio);
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
      });
    }
  }

  getInfoNegocio(codigoNegocio: string) {
    this.negociosService.obtener(codigoNegocio).subscribe({
      next: (data) => {
        this.negocio = data.respuesta;
        this.getInfoPropietarioNegocio(this.negocio.codigoCliente);
      },
      error: (error) => {
        console.log("Error al cargar el negocio ");
      }
    })
  }

  getCalificacionPromedio(codigoNegocio: string) {
    this.negociosService.obtenerCalificacionPromedio(codigoNegocio).subscribe({
      next: (data) => {
        this.calificacionPromedio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar la calificacion promedio ", error);
      }
    })
  }

  getInfoPropietarioNegocio(codigoPropietario: string) {
    this.clienteService.obtener(codigoPropietario).subscribe({
      next: (data) => {
        this.propietarioNegocio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar la calificacion promedio ", error);
      }
    })
  }

  agregarFavorito(option: boolean) {
    if (option) {
      const negocioFavoritoDTO: NegocioFavoritoDTO = new NegocioFavoritoDTO(this.tokenService.getId(), this.negocio.codigo);
      this.clienteService.agregarFavoritos(negocioFavoritoDTO).subscribe({
        next: (data) => {
          this.isFavorito = true;
          this.alertFavorito = new Alerta('Agregado a favorito existoramente!', 'success');
        },
        error: (error) => {
          if (error.status === 400) {
            this.alertFavorito = new Alerta('Error de conexión', 'danger');
          } else {
            if (error.error && error.error.respuesta) {
              this.alertFavorito = new Alerta(error.error.respuesta, 'danger');
            } else {
              this.alertFavorito = new Alerta('Se produjo un error, por favor verifica tus datos o intenta más tarde.', 'danger');
            }
          }
        }
      });
    } else {
      const negocioFavoritoDTO: NegocioFavoritoDTO = new NegocioFavoritoDTO(this.tokenService.getId(), this.negocio.codigo);
      this.clienteService.quitarFavoritos(negocioFavoritoDTO).subscribe({
        next: (data) => {
          this.alertFavorito = new Alerta('Se ha retirado como favorito!', 'success');
          this.isFavorito = false;
        },
        error: (error) => {
          if (error.status === 400) {
            this.alertFavorito = new Alerta('Error de conexión', 'danger');
          } else {
            if (error.error && error.error.respuesta) {
              this.alertFavorito = new Alerta(error.error.respuesta, 'danger');
            } else {
              this.alertFavorito = new Alerta('Se produjo un error, por favor verifica tus datos o intenta más tarde.', 'danger');
            }
          }
        }
      });
    }
  }

  rate(star: number) {
    this.newComment.calificacion = star;
  }
}
