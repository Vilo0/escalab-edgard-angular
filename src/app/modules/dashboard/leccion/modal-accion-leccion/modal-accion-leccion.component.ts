import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LeccionService } from '../../../../core/services/leccion.service';
import { CursoService } from '../../../../core/services/curso.service';

@Component({
  selector: 'app-modal-accion-leccion',
  templateUrl: './modal-accion-leccion.component.html',
  styleUrls: ['./modal-accion-leccion.component.scss']
})
export class ModalAccionLeccionComponent implements OnInit {

  @Input() leccion;
  @Input() accion;

  message:string = '';

  nuevaLeccion:any = {
    nombre: '',
    descripcion: '',
    documento: null,
    cursoId: ''
  };

  public leccionForm:any;

  nombre:string = '';
  descripcion:string = '';
  cursoId:string = '';
  documento:string = null;
  file:any;
  listaCursos:any = [];


  constructor(
    public activeModal: NgbActiveModal, 
    private cb: FormBuilder,
    private leccionService: LeccionService,
    private cursoService: CursoService,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.getCursos();

    if(this.leccion){
      this.nombre = this.leccion.nombre;
      this.descripcion = this.leccion.descripcion;
      this.documento = this.leccion.documento;
      this.cursoId = this.leccion.cursoId;
    }

    this.leccionForm = this.cb.group({
      nombre: [this.nombre, [ Validators.required]],
      descripcion: [this.descripcion, [ Validators.required]],
      documento: [null, [ Validators.required]],
      cursoId: this.cursoId,
    });

    console.log(this.leccionForm);

  }

  private getCursos(){

    this.cursoService.getCursos().subscribe( item => {

      this.listaCursos = item.data;

    });

  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.documento = event.target.result;
        console.log(this.documento);
    }
    reader.readAsDataURL(event.target.files[0]);

  }


  agregar() {


    this.nuevaLeccion.nombre = this.leccionForm.value.nombre;
    this.nuevaLeccion.descripcion = this.leccionForm.value.descripcion;
    this.nuevaLeccion.documento = this.documento;
    this.nuevaLeccion.cursoId = this.leccionForm.value.cursoId;

    this.leccionService.postLeccion(this.nuevaLeccion)
      .subscribe(item =>{

        console.log(item);
         this.activeModal.close();      

     }, (err) => {

         console.log(err);
         this.message = err.error.message;
      
     });

  }

  editar(){

    this.leccion.nombre = this.leccionForm.value.nombre;
    this.leccion.descripcion = this.leccionForm.value.descripcion;
    this.leccion.documento = this.documento;
    this.leccion.cursoId = this.leccionForm.value.cursoId;

    this.leccionService.putLeccion(this.leccion)
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

    this.leccionService.deleteLeccion(this.leccion._id)
      .subscribe(item =>{

        console.log(item);
        this.activeModal.close();      

    }, (err) => {

        console.log(err);
        this.message = err.error.message;
      
    });

  }


}
