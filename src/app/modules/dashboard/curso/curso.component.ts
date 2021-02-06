import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CursoService } from '../../../core/services/curso.service';
import { ModalAccionCursoComponent } from './modal-accion-curso/modal-accion-curso.component';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {

  closeResult = '';

  public listaCursos:any = [];

  constructor(private cursoService: CursoService, private modalService: NgbModal) { }

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

  private getCursos(){

    this.cursoService.getCursos().subscribe( item => {

      this.listaCursos = item.data;

    });

  }

  ngOnInit() {

    this.getCursos();

  }

}
