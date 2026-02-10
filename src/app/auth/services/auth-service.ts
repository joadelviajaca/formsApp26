import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal, Signal } from '@angular/core';
import { JWTPayload, LoginResponse, User } from '../interfaces';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private URLBase : string = 'http://localhost:3001/auth';

  private httpClient : HttpClient = inject(HttpClient);

  private _user  = signal<User|null>(null); 

  user = this._user.asReadonly();

  constructor(){
    const token = localStorage.getItem('token') || '';
    if (token) {

      this.verifyToken(token)
      .subscribe({
        next: response => {
          console.log('Valido')
          const {id, name, role} = jwtDecode<JWTPayload>(token);
          this._user.set({id, name , role})
        },
        error: error => {
          localStorage.removeItem('token')
        }
      })

    }
  }

  verifyToken(token: string ){
    const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Esto no se puede hacer porque set devuelve un nuevo objeto HttpHeaders, pero no modifica el original
    // const headers2: HttpHeaders = new HttpHeaders()
    // headers2.set('Authorization', `Bearer ${token}`)
    
    return this.httpClient.get('http://localhost:3001/missions', {
      headers
    })
  }


  login(email: string, password: string){
    // this.httpClient.post<LoginResponse>(`${this.URLBase}/login`, {email, password})
    // .subscribe({
    //   next: response => {
    //     // Actualizamos el estado
    //     this._user.set(response.user);
    //     localStorage.setItem('token', response.token)
    //   },
    //   error: error =>  console.log(error)
    // })
    return this.httpClient.post<LoginResponse>(`${this.URLBase}/login`, {email, password})
    .pipe(
      tap(response => {
        this._user.set(response.user);
        localStorage.setItem('token', response.token)
      })
    )
  }
  
}
