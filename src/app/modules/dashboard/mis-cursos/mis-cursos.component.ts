import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';

@Component({
  selector: 'app-mis-cursos',
  templateUrl: './mis-cursos.component.html',
  styleUrls: ['./mis-cursos.component.css']
})
export class MisCursosComponent implements OnInit {

  idUsuario:string = '601f1570ccb54906a47796d7';
  misCursos:any = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit() {

    this.getIdUsuario();

  }

  private getIdUsuario(){

    this.usuarioService.getUsuarioId(this.idUsuario).subscribe( item => {

      this.misCursos = item.data.cursos.items;

      console.log(this.misCursos);

    });

  }

  irMisLecciones(curso){

    this.usuarioService.guardarLecciones(curso.lecciones.items);
    
    this.router.navigateByUrl('/mis-lecciones/' + curso.cursoId._id);

  }

}
