import { Component } from '@angular/core';
import { TelefonoDTO } from '../../dto/TelefonoDTO';
import { Horario } from '../../dto/Horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActualizacionNegocioDTO } from '../../dto/ActualizacionNegocioDTO';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { TokenService } from '../../servicios/token.service';
import { ClienteService } from '../../servicios/cliente.service';
import { NegocioDTO } from '../../dto/NegocioDTO';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { ImagenService } from '../../servicios/imagen.service';
import { Alerta } from '../../dto/alerta';
import { ImagenDTO } from '../../dto/ImagenDTO';

@Component({
  selector: 'app-editar-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-negocio.component.html',
  styleUrl: './editar-negocio.component.css',
})
export class EditarNegocioComponent {
  negocio!: NegocioDTO;
  codigoNegocio: string;
  actualizacionNegocioDTO: ActualizacionNegocioDTO;
  horarios: Horario[];
  telefonos: TelefonoDTO[];
  archivos!: FileList;
  dias: string[];
  alerta!:Alerta;
  tiposNegocio: string[];

  constructor(
    private mapaService: MapaService,
    private publicoService: PublicoService,
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private imagenService: ImagenService
  ) {
    this.codigoNegocio = '';
    this.actualizacionNegocioDTO = new ActualizacionNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [new TelefonoDTO()];
    this.dias = [];
    this.tiposNegocio = [];
    this.cargarDias();
    this.cargarTiposNegocio();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa([-75.671289, 4.537435], 12).subscribe(() => {
      const itemsNegocios: ItemNegocioDTO[] = [];
      const itemNegocioDTO: ItemNegocioDTO = new ItemNegocioDTO(
        '',
        this.negocio.nombre,
        '',
        '',
        '',
        '',
        this.negocio.ubicacion,
        0,
        ''
      );
      itemsNegocios.push(itemNegocioDTO);
      this.mapaService.pintarMarcadores(itemsNegocios);

      this.mapaService.agregarMarcador().subscribe((marcador) => {
        this.actualizacionNegocioDTO.ubicacion.latitud = marcador.lat;
        this.actualizacionNegocioDTO.ubicacion.longitud = marcador.lng;
        console.log(this.actualizacionNegocioDTO);
      });
    });

    const codigo = this.route.snapshot.paramMap.get('idNegocio');
    if (codigo !== null) {
      this.codigoNegocio = codigo;
    }

    // O usando una suscripción si esperas que el parámetro pueda cambiar
    this.route.paramMap.subscribe((params) => {
      const codigo = this.route.snapshot.paramMap.get('idNegocio');
      if (codigo !== null) {
        this.codigoNegocio = codigo;
      }
    });
    this.getInfoNegocio(this.codigoNegocio);
  }

  getInfoNegocio(codigoNegocio: string) {
    this.negociosService.obtener(codigoNegocio).subscribe({
      next: (data) => {
        this.negocio = data.respuesta;
        this.actualizacionNegocioDTO.codigo = this.negocio.codigo;
        this.actualizacionNegocioDTO.codigoCliente = this.negocio.codigoCliente;
        this.actualizacionNegocioDTO.descripcion = this.negocio.descripcion;
        this.actualizacionNegocioDTO.horarios = this.negocio.horarios;
        this.actualizacionNegocioDTO.imagenes = this.negocio.imagenes;
        this.actualizacionNegocioDTO.nombre = this.negocio.nombre;
        this.actualizacionNegocioDTO.telefonos = this.negocio.telefonos;
        this.actualizacionNegocioDTO.tipoNegocio = this.negocio.tipoNegocio;
        this.actualizacionNegocioDTO.ubicacion = this.negocio.ubicacion;
        console.log(this.actualizacionNegocioDTO.telefonos);
        this.telefonos = this.actualizacionNegocioDTO.telefonos.map(
          (numero) => new TelefonoDTO(numero)
        );
      },
      error: (error) => {
        console.log('Error al cargar el negocio ');
      },
    });
  }

  private cargarTiposNegocio() {
    this.publicoService.listarTiposNegocio().subscribe({
      next: (data) => {
        this.tiposNegocio = data.respuesta;
      },
      error: (error) => {
        console.log('Error al cargar los tipos de negocio');
      },
    });
  }

  private cargarDias() {
    this.dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
  }

  public editarNegocio() {
    this.actualizacionNegocioDTO.telefonos = Array.from(this.telefonos)
    .map(telefono => telefono.numero)
    .filter((numero): numero is string => numero !== undefined);
    console.log(this.actualizacionNegocioDTO);
    this.negociosService.actualizar(this.actualizacionNegocioDTO).subscribe({
      next: (data) => {
        console.log("Negocio actualizado");
      },
      error: (error) => {
        console.log("Error al registrar el negocio");
      }
    });
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public agregarTelefono() {
    this.telefonos.push(new TelefonoDTO());
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      // this.registroNegocioDTO.imagenes = Array.from(this.archivos).map(file => file.name); // Asigna el archivo seleccionado al objeto usuario
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: (data) => {
          //this.usuario.fotoPerfil = data.respuesta.url;
          this.actualizacionNegocioDTO.imagenes.push(data.respuesta.url);
          this.editarNegocio();
          this.alerta = new Alerta('Se ha subido la imagen', 'success');
        },
        error: (error) => {
          this.alerta = new Alerta(error.error, 'danger');
        },
      });
    } else {
      this.alerta = new Alerta(
        'Debe seleccionar una imagen y subirla',
        'danger'
      );
    }
  }

  public eliminarImagen(imagen:string){

    const imagenDTO:ImagenDTO = new ImagenDTO(this.extraerPublicIdDesdeUrl(imagen), imagen);
    this.imagenService.eliminar(imagenDTO).subscribe({
      next: (data) => {
        //this.usuario.fotoPerfil = data.respuesta.url;
        const index = this.actualizacionNegocioDTO.imagenes.indexOf(imagen);
        if (index !== -1) {
          this.actualizacionNegocioDTO.imagenes.splice(index, 1);
        }
        this.editarNegocio();
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
