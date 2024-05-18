import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { RegistroUsuarioService } from '../../servicios/registro-usuario.service';
import { RegistroUsuarioDTO } from '../../dto/RegistroUsuarioDTO';
import { CommonModule } from '@angular/common';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { ImagenService } from '../../servicios/imagen.service';


@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule,CommonModule,AlertaComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroUsuarioComponent {

  ciudades : string[];
  archivos!:FileList;
  alerta!:Alerta;

  usuario: RegistroUsuarioDTO = {
    nombre: '',
    fotoPerfil: '',
    nickname: '',
    email: '',
    password: '',
    confirmaPassword: '',
    ciudadResidencia: ''
  };

  constructor( private registroUsuarioService : RegistroUsuarioService,private publicoService: PublicoService,private authService: AuthService,private imagenService: ImagenService) {
      this.ciudades = [];
      this.cargarCiudades();

  }

  private cargarCiudades(){
    this.publicoService.listarCiudades().subscribe({
      next:(data) => {
        this.ciudades = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar las ciudades");
      }
    })
  }

  submitForm() {
    if(this.usuario.fotoPerfil != ""){
      console.log(this.usuario);
      this.authService.registrarCliente(this.usuario).subscribe({

        next: (data) => {
          console.log("Cliente registrado");
        },
        error: (error) => {
          console.log("Error al registrar el cliente");
        }
      });
    }else{
      console.log("Debe cargar una foto");
    }
  }

  public sonIguales(): boolean {
    return this.usuario.password == this.usuario.confirmaPassword;
    }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.usuario.fotoPerfil = this.archivos[0].name; // Asigna el archivo seleccionado al objeto usuario
    }
  }

  public subirImagen() {
    if (this.archivos != null && this.archivos.length > 0) {
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.usuario.fotoPerfil = data.respuesta.url;
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
