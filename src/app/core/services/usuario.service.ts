import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  // private host = 'http://localhost:3000';
  private host = 'https://escalab-edgard-vilo.herokuapp.com';
  private url = this.host+'/api/v1';

  private leccionesCompletadas:any = [];

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

  public getUsuarios(): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/", { headers: header, withCredentials: true },);

  }


  public getUsuarioId(id): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + id, { headers: header, withCredentials: true },);

  }


  public postUsuario(usuario): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("telefono", usuario.telefono);
    formData.append("password", usuario.password);

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .post<any>(
          this.url + "/usuario", 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public putUsuario(usuario): Observable<any> {

    const formData: FormData = new FormData();

    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("telefono", usuario.telefono);
    formData.append("password", usuario.password);

    let token = this.loginService.token;

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
        .put<any>(
          this.url + "/usuario/" + usuario._id, 
          formData, 
          { headers: header, withCredentials: true },
        );

  }

  public deleteUsuario(id): Observable<any> {

    let header = new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http.delete(this.url + "/usuario/" + id, { headers: header, withCredentials: true });

  }


  public getUsuariosCurso(id): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/curso/" + id, { headers: header, withCredentials: true },);

  }

  public completarLeccion(idUsuario, idLeccion): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + idUsuario + "/leccion/" + idLeccion + '/completa', { headers: header, withCredentials: true },);

  }

  public noCompletarLeccion(idUsuario, idLeccion): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + idUsuario + "/leccion/" + idLeccion + '/incompleta', { headers: header, withCredentials: true },);

  }


  public activarCurso(usuarioId, cursoId): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + usuarioId + '/curso/' + cursoId + '/activar', { headers: header, withCredentials: true },);

  }


  public desactivarCurso(usuarioId, cursoId): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + usuarioId + '/curso/' + cursoId + '/desactivar', { headers: header, withCredentials: true },);

  }


  public agregarCurso(usuarioId, cursoId): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + usuarioId + '/curso/' + cursoId + '/agregar', { headers: header, withCredentials: true },);

  }


  public borrarCurso(usuarioId, cursoId): Observable<any> {

    let header= new HttpHeaders({
      'Authorization': this.token,
    });

    return this.http
      .get<any>(this.url +"/usuario/" + usuarioId + '/curso/' + cursoId + '/borrar', { headers: header, withCredentials: true },);

  }

  guardarLecciones(lecciones:any){
    localStorage.setItem('lecciones', lecciones);
  }
  
  obtenerLecciones(){
      return localStorage.getItem('lecciones') || '';
  }


}
