import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../../core/services/categoria.service';

@Component({
  selector: 'app-modal-accion-categoria',
  templateUrl: './modal-accion-categoria.component.html',
  styleUrls: ['./modal-accion-categoria.component.scss']
})
export class ModalAccionCategoriaComponent implements OnInit {

  @Input() categoria;
  @Input() accion;

  message:string = '';

  public categoriaForm:any;

  nombre:string = '';

  constructor(
    public activeModal: NgbActiveModal, 
    private cb: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {

    if(this.categoria){
      this.nombre = this.categoria.nombre;
    }

    this.categoriaForm = this.cb.group({
      nombre: [this.nombre, [ Validators.required]],
    });

  }


  agregar() {

    this.categoriaService.postCategoria(this.categoriaForm.value.nombre)
      .subscribe(item =>{

        this.activeModal.close();  
        
        if(item.result){
          this.toastr.success('Categoría ingresada correctamente', '');
        }
        else{
          this.toastr.warning('' + item.data, '');
        }
        //this.router.navigateByUrl('/categoria');

    }, (err) => {

        console.log(err);
        this.toastr.error(err.error.message, '');
        this.message = err.error.message;
      
    });

  }

  editar(){

    this.categoria.nombre = this.categoriaForm.value.nombre;

    console.log(this.categoria);

    this.categoriaService.putCategoria(this.categoria)
      .subscribe(item =>{

        if(item.result){
          this.toastr.success('Categoría actualizada correctamente', '');
        }
        else{
          this.toastr.warning('' + item.data, '');
        }

        this.activeModal.close();      
        //this.router.navigateByUrl('/categoria');

    }, (err) => {

        this.toastr.error(err.error.message, '');
        this.message = err.error.message;
      
    });

  }


  eliminar(){

    this.categoriaService.deleteCategoria(this.categoria._id)
      .subscribe(item =>{

        console.log(item);
        
        if(item.result){
          this.toastr.success('Categoría eliminada correctamente', '');
        }
        else{
          this.toastr.warning('' + item.data, '');
        }

        this.activeModal.close();      

    }, (err) => {

        this.toastr.error(err.error.message, '');
        this.message = err.error.message;
      
    });


  }

}
