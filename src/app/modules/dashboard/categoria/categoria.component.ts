import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAccionCategoriaComponent } from './modal-accion-categoria/modal-accion-categoria.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: [
    './categoria.component.scss'
  ],
})
export class CategoriaComponent implements OnInit {

  closeResult = '';

  public listaCategorias:any = [];

  constructor(private categoriaService: CategoriaService, private modalService: NgbModal) { }

  open(categoria, accion) {
    const modalRef = this.modalService.open(ModalAccionCategoriaComponent);
    modalRef.componentInstance.categoria = categoria;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getCategorias();
    }, (reason) => {
      // on dismiss
    });

  }


  private getCategorias(){

    this.categoriaService.getCategorias().subscribe( item => {

      this.listaCategorias = item.data;
      console.log(item);

    });

  }

  ngOnInit() {

    this.getCategorias();

  }

}
