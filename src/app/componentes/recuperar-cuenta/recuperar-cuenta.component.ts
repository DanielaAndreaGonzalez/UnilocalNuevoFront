import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { LoginService } from '../../servicios/login.service';
import { ClienteService } from '../../servicios/cliente.service';
import { Alerta } from '../../dto/alerta';
import { AlertaComponent } from '../alerta/alerta.component';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
 standalone: true,
 imports: [FormsModule, AlertaComponent],
  styleUrls: ['./recuperar-cuenta.component.css']
})
export class RecuperarCuentaComponent {
  email: string = '';
  alerta!:Alerta;

  constructor(private authService: AuthService ) { }

  recuperarContrasena() {
    // Lógica para enviar el correo electrónico y recuperar la contraseña
    console.log('Enviando correo electrónico a:', this.email);
    this.authService.enviarLinkRecuperacionPass(this.email).subscribe({
      next: (data) => {
        this.alerta = new Alerta('Revise en su badeja de entrada, si su correo existe se le ha enviado un correo con el link de recuperación', 'success')
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