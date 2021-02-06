import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CursoService } from '../../../core/services/curso.service';
import { LeccionService } from '../../../core/services/leccion.service';
import { ModalAccionLeccionComponent } from './modal-accion-leccion/modal-accion-leccion.component';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.scss']
})
export class LeccionComponent implements OnInit {

  closeResult = '';

  public listaLecciones:any = [];

  constructor(private leccionService: LeccionService, private modalService: NgbModal) { }

  open(leccion, accion) {

    const modalRef = this.modalService.open(ModalAccionLeccionComponent);
    modalRef.componentInstance.leccion = leccion;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getLecciones();
    }, (reason) => {
      // on dismiss
    });

  }

  private getLecciones(){

    this.leccionService.getLecciones().subscribe( item => {

      this.listaLecciones = item.data;

    });

  }

  ngOnInit() {

    this.getLecciones();

  }

}

