import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../dto/Comentario';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';
import { RegistroComentarioDTO } from '../dto/RegistroComentarioDTO';
import { NegocioFavoritoDTO } from '../dto/NegocioFavoritoDTO';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private clienteURL = "http://localhost:8080/api/clientes";
  constructor(private http: HttpClient) { }

  public crearComentario(nuevoComentario: RegistroComentarioDTO): Observable<MensajeDTO> {
    console.log("Ingresas a el servicio");
    return this.http.post<MensajeDTO>(`${this.clienteURL}/crear-comentario`, nuevoComentario);
  }

  public obtener(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/obtener/${codigoCliente}`);
  }

  public agregarFavoritos(negocioFavoritoDTO: NegocioFavoritoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/agregar-favoritos`, negocioFavoritoDTO);
  }

  public quitarFavoritos(negocioFavoritoDTO: NegocioFavoritoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.clienteURL}/quitar-favoritos`, negocioFavoritoDTO);
  }

  public listarNegociosFavoritos(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/listar-negocios-favoritos/${codigoCliente}`);
  }  
}
