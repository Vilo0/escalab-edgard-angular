import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  // private host = 'http://localhost:3000';
  private host = 'https://escalab-edgard-vilo.herokuapp.com';
  private url = this.host+'/api/v1';

  private token = this.loginService.token;

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

  public getPreguntas(): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/pregunta/", { headers: header, withCredentials: true });

  }


  public postPregunta(pregunta): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("descripcion", pregunta.descripcion );
    formData.append("imagen", pregunta.imagen );
    formData.append("leccionId", pregunta.leccionId );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .post<any>(
          this.url + "/leccion", 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public putPregunta(pregunta): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("descripcion", pregunta.descripcion );
    formData.append("imagen", pregunta.imagen );
    formData.append("leccionId", pregunta.leccionId );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/pregunta/" + pregunta._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deletePregunta(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/pregunta/" + id, { headers: header, withCredentials: true });

  }

  public getPreguntasLeccion(idLeccion): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/pregunta/leccion/" + idLeccion, { headers: header, withCredentials: true });

  }

}
