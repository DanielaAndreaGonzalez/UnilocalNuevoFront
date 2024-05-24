import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroUsuarioDTO } from '../dto/RegistroUsuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class RegistroUsuarioService {

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8080/usuario';

  registrarUsuario( usuario : RegistroUsuarioDTO) {
    this.http.post<any>(this.url+'/crear-usuario', usuario).subscribe(response => {
      console.log('Usuario registrado:', response);
      // Aquí podrías redirigir a otra página o realizar otras acciones después de que el usuario se haya registrado exitosamente.
    });
  }
}
