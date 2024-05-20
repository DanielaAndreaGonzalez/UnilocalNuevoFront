import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';
import { RegistroNegocioDTO } from '../dto/RegistroNegocioDTO';
import { Ubicacion } from '../dto/Ubicacion';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/MensajeDTO';
import { ActualizacionNegocioDTO } from '../dto/ActualizacionNegocioDTO';

@Injectable({
  providedIn: 'root'
})
export class NegociosService {

  private negociosURL = "http://localhost:9090/api/negocio";
  private clienteURL = "http://localhost:9090/api/clientes";



  constructor(private http: HttpClient) { }

  public crear(negocioNuevo: RegistroNegocioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.negociosURL}/crear-negocio`, negocioNuevo);
  }

  public actualizar(actualizacionNegocio: ActualizacionNegocioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.negociosURL}/editar-negocio`, actualizacionNegocio);
  }

  public obtener(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener/${codigoNegocio}`);
  }

  public eliminar(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.negociosURL}/eliminar/${codigoNegocio}`);
  }

  public listarNegociosPropietario(codigoCliente: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-negocios-usuario/${codigoCliente}`);
  }

  public obtenerCalificacionPromedio(codigoNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.clienteURL}/calcular-promedio-calificaciones/${codigoNegocio}`);
  }

  public obtenerNegocioPorNombre(nombreNegocio: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/obtener-por-nombre/${nombreNegocio}`);
  }

  public obtenerNegocios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.negociosURL}/listar-todos`);
  }

}
