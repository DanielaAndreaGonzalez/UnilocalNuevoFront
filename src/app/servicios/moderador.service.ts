import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/MensajeDTO';
import { Observable } from 'rxjs';
import { AutorizarNegocioDTO } from '../dto/AutorizarNegocioDTO';

@Injectable({
  providedIn: 'root'
})
export class ModeradorService {

  private moderadorURL = "http://localhost:9090/api/moderador";
  constructor(private http: HttpClient) { }


  public obtenerLugaresPendientesAutorizar(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/obtener-lugares-pendientes-autorizar`);
  }

  public obtenerHistoricoLugaresAutorizados(moderadorId:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/obtener-historico-lugares-autorizados/${moderadorId}`);
  }

  public obtenerHistoricoLugaresRechazados(moderadorId:string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.moderadorURL}/obtener-historico-lugares-rechazados/${moderadorId}`);
  }

  public rechazarNegocio(autorizarNegocioDTO: AutorizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.moderadorURL}/rechazar-negocio`, autorizarNegocioDTO);
  }

  public autorizarNegocio(autorizarNegocioDTO: AutorizarNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.moderadorURL}/autorizar-negocio`, autorizarNegocioDTO);
  }
}
