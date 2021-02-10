import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']
})
export class MisCursosComponent implements OnInit {

  idUsuario:string = '';
  misCursos:any = [];

  constructor(
    private usuarioService: UsuarioService, 
    private loginService: LoginService, 
    private router: Router
  ) { }

  ngOnInit() {

    if(this.loginService.estaAutenticado()){

      this.idUsuario = this.loginService.token;

      this.getIdUsuario();

    }
    else{
      this.router.navigateByUrl('/login');
    } 

  }

  private getIdUsuario(){

    this.usuarioService.getUsuarioId(this.idUsuario).subscribe( item => {

      if(item.data.cursos){
        this.misCursos = item.data.cursos.items;
      }

      this.misCursos = [];

      console.log(this.misCursos);

    });

  }

  irMisLecciones(curso){

    //this.usuarioService.guardarLecciones(curso.lecciones.items);
    
    this.router.navigateByUrl('/mis-lecciones/' + curso.cursoId._id);

  }

}
