import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from '../dto/LoginDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/login';

  constructor(private http: HttpClient) {}

  login(loginData: LoginDTO): Observable<any> {
    return this.http.post(this.apiUrl, loginData);
  }

  
  recuperarContrasena(loginData: LoginDTO): Observable<any> {
    return this.http.post(this.apiUrl, loginData);
  }
}
