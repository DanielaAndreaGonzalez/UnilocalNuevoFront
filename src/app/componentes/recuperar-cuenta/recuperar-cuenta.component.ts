import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-recuperar-cuenta',
  templateUrl: './recuperar-cuenta.component.html',
 standalone: true,
 imports: [FormsModule],
  styleUrls: ['./recuperar-cuenta.component.css']
})
export class RecuperarCuentaComponent {
  email: string = '';

  constructor() { }

  recuperarContrasena() {
    // Lógica para enviar el correo electrónico y recuperar la contraseña
    console.log('Enviando correo electrónico a:', this.email);
  }
}