import { Component } from '@angular/core';
import {
  FormGroup,
  ReactiveFormsModule,
  FormControl,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../servicios/login.service';
import { TokenService } from '../../servicios/token.service';
import { AuthService } from '../../servicios/auth.service';
import { Alerta } from '../../dto/alerta';
import { LoginDTO } from '../../dto/LoginDTO';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AlertaComponent } from '../alerta/alerta.component';

@Component({
  selector: 'app-login-moderador',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,RouterOutlet,RouterModule, AlertaComponent],
  templateUrl: './login-moderador.component.html',
  styleUrl: './login-moderador.component.css'
})
export class LoginModeradorComponent {
  alerta!: Alerta;
  loginDTO: LoginDTO;

  loginForm: FormGroup = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {
    this.loginDTO = new LoginDTO();
  }

  public login() {
    this.loginDTO.correo = this.loginForm.get('correo')?.value;
    this.loginDTO.password = this.loginForm.get('password')?.value;
    console.log('this login', this.loginDTO);
    this.authService.loginModerador(this.loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);
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
      },
    });
  }
}
