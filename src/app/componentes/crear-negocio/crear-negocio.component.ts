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

  constructor(private negociosService: NegociosService, private mapaService: MapaService, private publicoService: PublicoService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.telefonos = [new TelefonoDTO()];
    this.dias = [];
    this.tiposNegocio = [];
    this.cargarDias();
    this.cargarTiposNegocio();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();

    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
      console.log(this.registroNegocioDTO);
    });
  }

  private cargarTiposNegocio(){
    /*this.publicoService.listarCiudades().subscribe({
      next:(data) => {
        this.tiposNegocio = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    })*/
  }

  private cargarDias(){
    this.dias = ['Lunes',"Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
  }

  public crearNegocio(){
    this.registroNegocioDTO.horarios = this.horarios;

    this.registroNegocioDTO.telefonos = Array.from(this.telefonos)
    .map(telefono => telefono.numero)  // Mapea a los números, resultando en 'string | undefined'
    .filter((numero): numero is string => numero !== undefined);

    this.negociosService.crear(this.registroNegocioDTO);
    console.log(this.registroNegocioDTO);
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
      this.registroNegocioDTO.imagenes = Array.from(this.archivos).map(file => file.name); // Asigna el archivo seleccionado al objeto usuario
    }
  }




}
