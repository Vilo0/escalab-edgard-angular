import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ModelCategoria } from '../models/categoria';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private host = 'http://localhost:3000';
  // private host = 'https://node4g-test.herokuapp.com';
  private url = this.host+'/api/v1';

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvSWQiOiI2MDE1N2IyNmIwMGY2NjQwZGNlYmQxNDAiLCJyb2xlIjoiQURNSU5fUk9MRSIsImlhdCI6MTYxMjExNzUzOSwiZXhwIjoxNjEyNzIyMzM5fQ.JTfY-BzKlBHPzwP2dFBKwlMltcrLQJYEfki9hanxwdY';

  public categoria: ModelCategoria;

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

  public getCategorias(): Observable<any> {

    return this.http
      .get<any>(this.url +"/categoria/");

  }


  public postCategoria(nombre): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("nombre", nombre );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .post<any>(
          this.url + "/categoria", 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public putCategoria(categoria): Observable<any> {

    const formData: FormData = new FormData();
    formData.append("nombre", categoria.nombre );

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/categoria/" + categoria._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deleteCategoria(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/categoria/" + id, { headers: header, withCredentials: true });

  }

  

}
