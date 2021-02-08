import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LeccionService {

  private host = 'http://localhost:3000';
  // private host = 'https://node4g-test.herokuapp.com';
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

  public getLecciones(): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/leccion/", { headers: header, withCredentials: true });

  }


  public getLeccionesCurso(idCurso): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/leccion/curso/" + idCurso, { headers: header, withCredentials: true });

  }


  public postLeccion(leccion): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", leccion.nombre );
    formData.append("descripcion", leccion.descripcion );
    formData.append("documento", leccion.documento );
    formData.append("cursoId", leccion.cursoId );

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

  public putLeccion(leccion): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", leccion.nombre );
    formData.append("descripcion", leccion.descripcion );
    formData.append("imagen", leccion.imagen );
    formData.append("cursoId", leccion.cursoId );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/leccion/" + leccion._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deleteLeccion(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/leccion/" + id, { headers: header, withCredentials: true });

  }

}
