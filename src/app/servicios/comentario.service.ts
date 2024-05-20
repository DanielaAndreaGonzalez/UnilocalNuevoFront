import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private negociosURL = "http://localhost:9090/api/comentario";

  constructor(private http: HttpClient) { }
}
