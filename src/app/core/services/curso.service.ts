import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //private host = 'https://escalab-edgard-vilo.herokuapp.com';
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

  public getCursos(): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/curso/", { headers: header, withCredentials: true });

  }


  public postCurso(curso): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", curso.nombre );
    formData.append("descripcion", curso.descripcion );
    formData.append("imagen", curso.imagen );
    formData.append("nombre_categoria", curso.nombre_categoria );


    console.log('imagen: ', curso.imagen);

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .post<any>(
          this.url + "/curso", 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public putCurso(curso): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", curso.nombre );
    formData.append("descripcion", curso.descripcion );
    formData.append("imagen", curso.imagen );
    formData.append("nombre_categoria", curso.nombre_categoria );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/curso/" + curso._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deleteCurso(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/curso/" + id, { headers: header, withCredentials: true });

  }


  public getCursosCategoria(idCategoria): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/curso/categoria/" + idCategoria, { headers: header, withCredentials: true });

  }


}
