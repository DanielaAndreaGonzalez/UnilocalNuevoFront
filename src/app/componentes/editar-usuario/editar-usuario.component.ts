import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { ClienteService } from '../../servicios/cliente.service';
import { TokenService } from '../../servicios/token.service';
import { DetalleClienteDTO } from '../../dto/DetalleClienteDTO';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { ActualizarClienteDTO } from '../../dto/ActualizarClienteDTO';
import { ImagenDTO } from '../../dto/ImagenDTO';
import { ImagenService } from '../../servicios/imagen.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  standalone: true,
  imports: [FormsModule,CommonModule, AlertaComponent, AlertaComponent],
  styleUrls: ['./editar-usuario.component.css'],
})
export class EditarUsuarioComponent {
  alerta!:Alerta;
  selectedImage: any = null;
  usuario: DetalleClienteDTO;
  actualizarClienteDTO!:ActualizarClienteDTO;

  ciudades: string[];

  constructor(
    private publicoService: PublicoService,
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private imagenService:ImagenService,
    private clienteService: ClienteService
  ) {
    this.usuario = new DetalleClienteDTO('','','','','','');
    this.ciudades = [];
    this.cargarCiudades();
  }

  ngOnInit() {
    this.getInfoCliente();
  }


  getInfoCliente(){
    const codigoCliente = this.tokenService.getId();
    this.clienteService.obtener(codigoCliente).subscribe({
      next: (data) => {
          this.usuario = data.respuesta;
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

  editarUsuaurio(){
    this.actualizarClienteDTO =  new ActualizarClienteDTO(
      this.usuario.id, this.usuario.nombre, this.usuario.fotoPerfil, this.usuario.nickname, this.usuario.email, this.usuario.ciudadResidencia
    );

    console.log(this.actualizarClienteDTO);

    this.clienteService.actualizar(this.actualizarClienteDTO).subscribe({
      next: (data) => {
        this.alerta = new Alerta('Modificado con existo!', 'success');
        this.actualizarClienteDTO = new ActualizarClienteDTO('','','','','','');
        this.getInfoCliente();
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



  private cargarCiudades() {
    this.publicoService.listarCiudades().subscribe({
      next: (data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.log('Error al cargar las ciudades');
      },
    });
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Aquí puedes manejar el archivo seleccionado.
      // Por ejemplo, puedes leerlo como una URL de datos y mostrarlo en la página:
      const reader = new FileReader();
      reader.onload = (e) => (this.selectedImage = reader.result);

      reader.readAsDataURL(file);
    }
  }

  subirImagen(){

  }

  eliminarImagen(foto:string){
    const imagenDTO:ImagenDTO = new ImagenDTO(this.extraerPublicIdDesdeUrl(foto), foto);
    this.imagenService.eliminar(imagenDTO).subscribe({
      next: (data) => {
        this.alerta = new Alerta('Se ha eliminado la iamgen', 'success');
      },
      error: (error) => {
        this.alerta = new Alerta(error.error, 'danger');
      },
    });
  }

  private extraerPublicIdDesdeUrl(url:string):string {
    // Divide la URL en partes, asumiendo que no hay carpetas en el public_id
    const partes = url.split('/');
    let archivo = partes.pop(); // Obtiene el último segmento que incluye el formato
    if (archivo!=undefined){
      archivo = archivo.split('.')[0]; // Elimina la extensión del archivo
      return archivo;
    }
    return '';
  }
}
