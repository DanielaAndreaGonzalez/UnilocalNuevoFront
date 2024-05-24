import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CambioPasswordDTO } from '../../dto/CambioPasswordDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [FormsModule,CommonModule, AlertaComponent],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  tokenUrl: string = '';
  contraseniasNoCoinciden: boolean = false;
  cambioPasswordDto!: CambioPasswordDTO;
  alerta!:Alerta;

  cambioPassword= {
    nuevaContrasena: '',
    contraseniaConfirmada: ''
  };

  constructor(private route: ActivatedRoute, private authService:AuthService) {
    this.route.paramMap.subscribe(params => {
      this.tokenUrl = params.get('token') || '';
    });
  }

  cambiarContrasena() {
    if (this.cambioPassword.nuevaContrasena !== this.cambioPassword.contraseniaConfirmada) {
      this.contraseniasNoCoinciden = true;
      return;
    }
    
    this.cambioPasswordDto = new CambioPasswordDTO(this.cambioPassword.nuevaContrasena,'', this.tokenUrl);

    this.authService.cambiarContraseña(this.cambioPasswordDto).subscribe({
      next: (data) => {
        this.alerta = new Alerta("Contraseña modificada correctamente", "success");
        this.cambioPassword = {
          nuevaContrasena: '',
          contraseniaConfirmada: ''
        };
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
