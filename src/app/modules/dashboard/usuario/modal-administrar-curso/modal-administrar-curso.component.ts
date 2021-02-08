import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { findIndex } from 'rxjs/operators';
import { CursoService } from 'src/app/core/services/curso.service';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-modal-administrar-curso',
  templateUrl: './modal-administrar-curso.component.html',
  styleUrls: ['./modal-administrar-curso.component.css']
})
export class ModalAdministrarCursoComponent implements OnInit {

  @Input() cursos;
  @Input() usuarioId;
  @Input() accion;

  listaCursos:any = [];
  message:string = '';

  constructor(
    public activeModal: NgbActiveModal, 
    private cursoService: CursoService,
    private usuarioService: UsuarioService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.getCursos();
    console.log('usuarioId: ', this.usuarioId);

  }

  private getCursos(){

    this.cursoService.getCursos().subscribe( item => {

      item.data.forEach(element => {

        let index = this.cursos.findIndex(miCurso => {
          return element._id.toString() === miCurso.cursoId._id.toString();
        });

        let tieneElCurso = false;

        if(index >= 0){
          tieneElCurso = !tieneElCurso;
        }

        this.listaCursos.push({
          _id: element._id,
          nombre: element.nombre,
          tiene: tieneElCurso
        });
        
      });
      

    });

  }


  administrarCurso(event, idCurso){

    console.log(event.target.checked);

    if(event.target.checked){
      this.agregarCurso(idCurso);
    }
    else{
      this.borrarCurso(idCurso);
    }

  }


  agregarCurso(idCurso){

    this.usuarioService.agregarCurso(this.usuarioId, idCurso).subscribe( item => {

      console.log(item);

      if(item.result){
        this.toastr.success('Curso Agregado Correctamente', '');
      }

    });

  }

  borrarCurso(idCurso){

    this.usuarioService.borrarCurso(this.usuarioId, idCurso).subscribe( item => {

      console.log(item);

      if(item.result){
        this.toastr.success('Curso Borrado Correctamente', '');
      }

    });

  }



}

