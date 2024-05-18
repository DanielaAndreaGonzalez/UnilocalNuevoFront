import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RegistroUsuarioComponent } from './componentes/registro/registro.component';
import { TokenService } from './servicios/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RegistroUsuarioComponent,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Unilocal';
  isLogged = false;
  footer = '© 2024 Unilocal. Todos los derechos reservados.';
  email: string = "";
  isLoggedCliente = false;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isLoggedCliente = this.tokenService.isLoggedCliente();
    if (this.isLogged) {
    this.email = this.tokenService.getEmail();
    }
  }

  public logout() {
    this.tokenService.logout();
  }




}


