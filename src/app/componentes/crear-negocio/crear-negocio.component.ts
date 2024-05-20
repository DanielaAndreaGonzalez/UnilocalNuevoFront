import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistroNegocioDTO } from '../../dto/RegistroNegocioDTO';
import { NegociosService } from '../../servicios/negocios.service';
import { Horario } from '../../dto/Horario';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';
import { TelefonoDTO } from '../../dto/TelefonoDTO';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';
import { ImagenService } from '../../servicios/imagen.service';
import { Alerta } from '../../dto/alerta';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})
export class CrearNegocioComponent {

  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  telefonos: TelefonoDTO[];
  archivos!:FileList;
  dias:string[];
  tiposNegocio : string[];
  alerta!:Alerta;
  imagenSubidas:string[];

  constructor(private negociosService: NegociosService, private mapaService: MapaService, private publicoService: PublicoService
    ,private imagenService: ImagenService, private tokenService:TokenService   ) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [new TelefonoDTO()];
    this.dias = [];
    this.tiposNegocio = [];
    this.imagenSubidas =[];
    this.cargarDias();
    this.cargarTiposNegocio();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa([-75.671289, 4.537435], 12);

    this.mapaService.agregarMarcador().subscribe((marcador) => {
    this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
    this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    console.log(this.registroNegocioDTO);
    });
  }

  private cargarTiposNegocio(){
    this.publicoService.listarTiposNegocio().subscribe({
      next:(data) => {
        this.tiposNegocio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar los tipos de negocio");
      }
    })
  }

  private cargarDias(){
    this.dias = ['Lunes',"Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
  }

  public crearNegocio(){
    this.registroNegocioDTO.horarios = this.horarios;
    this.registroNegocioDTO.codigoCliente = this.tokenService.getId();
    this.registroNegocioDTO.telefonos = Array.from(this.telefonos)
    .map(telefono => telefono.numero)  // Mapea a los números, resultando en 'string | undefined'
    .filter((numero): numero is string => numero !== undefined);

    if(this.imagenSubidas.length > 0){
      this.registroNegocioDTO.imagenes = this.imagenSubidas;
      this.negociosService.crear(this.registroNegocioDTO).subscribe({
        next: (data) => {
          console.log("Negocio registrado");
        },
        error: (error) => {
          console.log("Error al registrar el negocio");
        }
      });
      console.log(this.registroNegocioDTO);
    }

  }

  public agregarHorario(){
    this.horarios.push(new Horario());
  }

  public agregarTelefono(){
    this.telefonos.push(new TelefonoDTO());
  }


  onFileChange(event: any){
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      //this.registroNegocioDTO.imagenes = Array.from(this.archivos).map(file => file.name);
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          //this.usuario.fotoPerfil = data.respuesta.url;
          this.imagenSubidas.push(data.respuesta.url);
          this.alerta = new Alerta("Se ha subido la foto", "success");
        },
        error: error => {
          this.alerta = new Alerta(error.error, "danger");
        }
      });
    }
    else
    {
      this.alerta = new Alerta("Debe seleccionar una imagen y subirla", "danger");
    }
  }
}
