import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Transaccion } from '../models/transaccion';
import { ModelUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  // private host = 'http://localhost:3000';
  private host = 'https://escalab-edgard-vilo.herokuapp.com';
  private url = this.host + '/api/v1';
  public usuario: ModelUsuario;

  constructor(
    private http: HttpClient,
  ) { }


  get token(): string {
    return localStorage.getItem('token') || '';
  }




  guardarLocalStorage(token: string) {

    localStorage.setItem('token', token);

    let hoy = new Date();
    hoy.setSeconds(604800);
    localStorage.setItem('expira', hoy.getTime().toString());

  }

  estaAutenticado(): boolean {
        
    if (localStorage.getItem('token')===null)
      return false;

    if (localStorage.getItem('usuario') === null)
      return false;

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }


  }

  getUsuario() {
    return JSON.parse(localStorage.getItem('usuario')) || {};
  }



//////////////Signin

  login(email:String, password: String){

    let data = {
      email,
      password
    }

    return this.http.post<Transaccion>(`${this.url}/login`, data, 
    { withCredentials: true })
    .pipe(
      tap((resp: Transaccion )=> {
        
        if (resp.result ){

          console.log('entro al servicio de login: ', resp.data);

          this.guardarLocalStorage(resp.data['token']);

          this.usuario = new ModelUsuario(
            resp.data['usuarioId'],
            resp.data['nombre'],
            resp.data['role']
          );

          localStorage.setItem('usuario', JSON.stringify(this.usuario))
          
          
        }
        
      })
    );

  }


  signin(usuario:any) {

    const formData: FormData = new FormData();

    formData.append("nombre", usuario.nombre);
    formData.append("apellido", usuario.apellido);
    formData.append("email", usuario.email);
    formData.append("telefono", usuario.telefono);
    formData.append("password", usuario.password);

    
    return this.http.post<Transaccion>(`${this.url}/registro`, formData,
      { withCredentials: true })
      .pipe(
        tap((resp: Transaccion) => {
          if (resp.result) {
            // this.guardarLocalStorage(resp.data['token']);

            // this.usuario = new ModelUsuario(
            //   resp.data['usuarioId'],
            //   resp.data['nombre'],
            //   resp.data['role']
            // );
            // localStorage.setItem('usuario', JSON.stringify(this.usuario))

          }

        })
      );

  }



  logout(){

      localStorage.removeItem('token');
      localStorage.removeItem('expira');
      localStorage.removeItem('usuario');
    
      return true;

    
  }


}
