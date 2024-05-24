import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroUsuarioDTO } from '../dto/RegistroUsuarioDTO';
import { Observable } from 'rxjs';
import { LoginDTO } from '../dto/LoginDTO';
import { MensajeDTO } from '../dto/MensajeDTO';
import { CambioPasswordDTO } from '../dto/CambioPasswordDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";

  constructor(private http: HttpClient) { }

  public registrarCliente(cliente: RegistroUsuarioDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/crear-usuario`, cliente);
  }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, loginDTO);
  }

  public loginModerador(loginDTO: LoginDTO): Observable<MensajeDTO>{
    return this.http.post<MensajeDTO>(`${this.authURL}/login-moderador`, loginDTO);
  }

  public enviarLinkRecuperacionPass(correoRecuperacion: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.authURL}/enviar-link-recuperar-pass/${correoRecuperacion}`);
  }

  public cambiarContraseña(cambioPasswordDTO: CambioPasswordDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/cambiar-password`, cambioPasswordDTO);
  }

}
