import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../core/services/categoria.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAccionCategoriaComponent } from './modal-accion-categoria/modal-accion-categoria.component';
import { ModalAccionCursoComponent } from '../curso/modal-accion-curso/modal-accion-curso.component';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../../core/services/login.service';
import { Router } from '@angular/router';

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

  constructor(
    private categoriaService: CategoriaService, 
    private modalService: NgbModal, 
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService) { }

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


  openCurso(nombre_categoria, accion){

    const modalRef = this.modalService.open(ModalAccionCursoComponent);
    modalRef.componentInstance.curso = null;
    modalRef.componentInstance.nombre_cat = nombre_categoria;
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

      if(!item.result){
        this.toastr.error('Hubo un error al Cargar la data', '');
      }
      
      else{
        if(this.listaCategorias.length > 0){
          this.toastr.success('Categorías cargadas correctamente!', '');
        }
        else{
          this.toastr.warning('No se encontraron categorías', '');
        }
      }

      

    });

  }

  ngOnInit() {

    if(this.loginService.estaAutenticado()){
      this.getCategorias();
    }
    else{
      this.router.navigateByUrl('/login');
    }   

  }

}
