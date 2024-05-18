import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicoService } from '../../servicios/publico.service';
import { AuthService } from '../../servicios/auth.service';
import { ImagenService } from '../../servicios/imagen.service';

interface Usuario {
  nombre: string;
  nickname: string;
  correo: string;
  ciudad: string;
  fotoURL: string;
}

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {
  selectedImage: any = null;
  usuario: Usuario = {
    nombre: 'Usuario perez',
    nickname: 'pedrito',
    correo: 'perezpedro1999@gmail.com',
    ciudad: 'Nueva ciudad',
    fotoURL: 'https://via.placeholder.com/150' // Reemplaza con la URL de tu imagen de perfil
  };

  ciudades : string[];


  constructor(private publicoService: PublicoService,private authService: AuthService,private imagenService: ImagenService) {
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

  onFileSelected(event: any) {
  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];

    // Aquí puedes manejar el archivo seleccionado.
    // Por ejemplo, puedes leerlo como una URL de datos y mostrarlo en la página:
    const reader = new FileReader();
    reader.onload = e => this.selectedImage = reader.result;

    reader.readAsDataURL(file);
  }
}
}