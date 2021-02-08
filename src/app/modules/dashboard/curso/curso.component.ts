import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from '../../../core/services/curso.service';
import { ModalAccionCursoComponent } from './modal-accion-curso/modal-accion-curso.component';
import { ModalAccionLeccionComponent } from '../leccion/modal-accion-leccion/modal-accion-leccion.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  closeResult = '';

  public listaCursos:any = [];

  constructor(
    private cursoService: CursoService, 
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  open(curso, accion) {

    const modalRef = this.modalService.open(ModalAccionCursoComponent);
    modalRef.componentInstance.curso = curso;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getCursos();
    }, (reason) => {
      // on dismiss
    });

  }

  openLeccion(idCurso, accion){

    const modalRef = this.modalService.open(ModalAccionLeccionComponent);
    modalRef.componentInstance.leccion = null;
    modalRef.componentInstance.cursoId = idCurso;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getCursos();
    }, (reason) => {
      // on dismiss
    });

  }

  private getCursos(){

    this.cursoService.getCursos().subscribe( item => {

      this.listaCursos = item.data;

      console.log(item);

      if(!item.result){
        this.toastr.error('Hubo un error al cargar la data', '');
      }

      else{
        if(this.listaCursos.length > 0){
          this.toastr.success('Cursos cargados correctamente!', '');
        }
        else{
          this.toastr.warning('No se encontraron cursos', '');
        }
      }

    });

  }

  private getCursosCategoria(idCategoria){

    this.cursoService.getCursosCategoria(idCategoria).subscribe( item => {

      this.listaCursos = item.data;

      console.log(item);

      if(this.listaCursos.length > 0){
        this.toastr.success('', 'Cursos cargados correctamente!');
      }
      else{
        this.toastr.warning('', 'No se encontraron cursos');
      }

    });

  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      const categoriaId = params.get("categoriaId");

      console.log('categoriId es:', categoriaId);

      if(categoriaId == null){
        this.getCursos();
      }
      else{
        this.getCursosCategoria(categoriaId);
      }

    });

    

  }

}
