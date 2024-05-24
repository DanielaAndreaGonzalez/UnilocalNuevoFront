import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';

@Injectable({
  providedIn: 'root'
})
export class PublicoService {

  private publicoURL = "http://localhost:8080/api/publico";

  constructor(private http: HttpClient) { }

  public listarCiudades(): Observable<MensajeDTO>{
      return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-ciudades`);
  }

  public listarTiposNegocio(): Observable<MensajeDTO> {
     return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-tipos-negocio`);
  }


  public obtenerNegocios(): Observable<MensajeDTO> {
    console.log('Incia solicitud negocios cercanos..');
    return this.http.get<MensajeDTO>(`${this.publicoURL}/listar-negocios-cernanos`);
  }
}
