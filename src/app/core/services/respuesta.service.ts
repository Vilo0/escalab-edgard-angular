import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private host = 'https://escalab-edgard-vilo.herokuapp.com';
  // private host = 'https://node4g-test.herokuapp.com';
  private url = this.host+'/api/v1';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOiI2MDE1N2IyNmIwMGY2NjQwZGNlYmQxNDAiLCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTYxMjExNzUzOSwiZXhwIjoxNjEyNzIyMzM5fQ.JTfY-BzKlBHPzwP2dFBKwlMltcrLQJYEfki9hanxwdY';

  options = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Credentials': 'same-origin'
    }),
    withCredentials: true
  }

  constructor(private http: HttpClient, private loginService: LoginService) { }

  private subject = new Subject<any>();

  public getRespuestas(): Observable<any> {

    return this.http
      .get<any>(this.url +"/respuesta/");

  }


  public postRespuesta(respuesta): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("descripcion", respuesta.descripcion );
    formData.append("imagen", respuesta.imagen );
    formData.append("preguntaId", respuesta.preguntaId );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .post<any>(
          this.url + "/respuesta", 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public putRespuesta(respuesta): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("descripcion", respuesta.descripcion );
    formData.append("imagen", respuesta.imagen );
    formData.append("preguntaId", respuesta.preguntaId );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/respuesta/" + respuesta._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deleteRespuesta(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/respuesta/" + id, { headers: header, withCredentials: true });

  }


}
