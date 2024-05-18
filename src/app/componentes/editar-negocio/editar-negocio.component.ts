import { Component } from '@angular/core';
import { TelefonoDTO } from '../../dto/TelefonoDTO';
import { Horario } from '../../dto/Horario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActualizacionNegocioDTO } from '../../dto/ActualizacionNegocioDTO';
import { MapaService } from '../../servicios/mapa.service';

@Component({
  selector: 'app-editar-negocio',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './editar-negocio.component.html',
  styleUrl: './editar-negocio.component.css'
})
export class EditarNegocioComponent {

  actualizacionNegocioDTO : ActualizacionNegocioDTO;
  horarios: Horario[];
  telefonos: TelefonoDTO[];
  archivos!:FileList;
  dias:string[];
  tiposNegocio : string[];

  constructor(private mapaService: MapaService){
    this.actualizacionNegocioDTO = new ActualizacionNegocioDTO();
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
      this.actualizacionNegocioDTO.ubicacion.latitud = marcador.lat;
      this.actualizacionNegocioDTO.ubicacion.longitud = marcador.lng;
      console.log(this.actualizacionNegocioDTO);
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

  public editarNegocio(){

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
     // this.registroNegocioDTO.imagenes = Array.from(this.archivos).map(file => file.name); // Asigna el archivo seleccionado al objeto usuario
    }
  }


}
