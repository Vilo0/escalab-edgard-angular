import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CursoService } from '../../../../core/services/curso.service';
import { CategoriaService } from '../../../../core/services/categoria.service';

@Component({
  selector: 'app-modal-accion-curso',
  templateUrl: './modal-accion-curso.component.html',
  styleUrls: ['./modal-accion-curso.component.scss']
})
export class ModalAccionCursoComponent implements OnInit {

  @Input() curso;
  @Input() accion;
  @Input() nombre_cat = '';

  message:string = '';

  nuevoCurso:any = {
    nombre: '',
    descripcion: '',
    imagen: null,
    nombre_categoria: ''
  };

  public cursoForm:any;

  nombre:string = '';
  descripcion:string = '';
  nombre_categoria:string = '';
  imagen:string = null;
  file:any;
  listaCategorias:any = [];


  constructor(
    public activeModal: NgbActiveModal, 
    private cb: FormBuilder,
    private cursoService: CursoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.getCategorias();

    if(this.curso){
      this.nombre = this.curso.nombre;
      this.descripcion = this.curso.descripcion;
      this.imagen = this.curso.imagen;
      this.nombre_categoria = this.curso.nombre_categoria;
    }

    if(this.nombre_cat != ''){
      this.nombre_categoria = this.nombre_cat;
    }

    this.cursoForm = this.cb.group({
      nombre: [this.nombre, [ Validators.required]],
      descripcion: [this.descripcion, [ Validators.required]],
      imagen: [null, [ Validators.required]],
      nombre_categoria: this.nombre_categoria,
    });

  }

  private getCategorias(){

    this.categoriaService.getCategorias().subscribe( item => {

      this.listaCategorias = item.data;

    });

  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.imagen = event.target.result;
        console.log(this.imagen);
    }
    reader.readAsDataURL(event.target.files[0]);

  }


  agregar() {


    this.nuevoCurso.nombre = this.cursoForm.value.nombre;
    this.nuevoCurso.descripcion = this.cursoForm.value.descripcion;
    this.nuevoCurso.imagen = this.imagen;
    this.nuevoCurso.nombre_categoria = this.cursoForm.value.nombre_categoria;

    this.cursoService.postCurso(this.nuevoCurso)
      .subscribe(item =>{

        console.log(item);
         this.activeModal.close();      

     }, (err) => {

         console.log(err);
         this.message = err.error.message;
      
     });

  }

  editar(){

    this.curso.nombre = this.cursoForm.value.nombre;
    this.curso.descripcion = this.cursoForm.value.descripcion;
    this.curso.imagen = this.imagen;
    this.curso.nombre_categoria = this.cursoForm.value.nombre_categoria;

    this.cursoService.putCurso(this.curso)
      .subscribe(item =>{

        console.log(item);
        this.activeModal.close();      
        //this.router.navigateByUrl('/categoria');

    }, (err) => {

        console.log(err);
        this.message = err.error.message;
      
    });

  }


  eliminar(){

    this.cursoService.deleteCurso(this.curso._id)
      .subscribe(item =>{

        console.log(item);
        this.activeModal.close();      

    }, (err) => {

        console.log(err);
        this.message = err.error.message;
      
    });

  }


}
