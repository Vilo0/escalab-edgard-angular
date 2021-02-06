import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../../core/services/usuario.service';

@Component({
  selector: 'app-modal-accion-usuario',
  templateUrl: './modal-accion-usuario.component.html',
  styleUrls: ['./modal-accion-usuario.component.scss']
})
export class ModalAccionUsuarioComponent implements OnInit {

  @Input() usuario;
  @Input() accion;

  message:string = '';

  nuevoUsuario:any = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: ''
  };

  public usuarioForm:any;

  nombre:string = '';
  apellido:string = '';
  email:string = '';
  telefono:string = '';
  password:string = '';


  constructor(
    public activeModal: NgbActiveModal, 
    private cb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {

    if(this.usuario){
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.email = this.usuario.email;
      this.telefono = this.usuario.telefono;
    }

    this.usuarioForm = this.cb.group({
      nombre: [this.nombre, [ Validators.required]],
      apellido: [this.apellido, [ Validators.required]],
      email: [this.email, [ Validators.required, Validators.email, Validators.minLength(5)]],
      telefono: [this.telefono, [ Validators.minLength(8)]],
      password: [this.password, [ Validators.minLength(6)]]
    });

    console.log(this.usuarioForm);

  }


  agregar() {

    this.nuevoUsuario.nombre = this.usuarioForm.value.nombre;
    this.nuevoUsuario.apellido = this.usuarioForm.value.apellido;
    this.nuevoUsuario.email = this.usuarioForm.value.email;
    this.nuevoUsuario.telefono = this.usuarioForm.value.telefono;
    this.nuevoUsuario.password = this.usuarioForm.value.password;

    this.usuarioService.postUsuario(this.nuevoUsuario)
      .subscribe(item =>{

        console.log(item);
         this.activeModal.close();      

     }, (err) => {

         console.log(err);
         this.message = err.error.message;
      
     });

  }

  editar(){

    this.usuario.nombre = this.usuarioForm.value.nombre;
    this.usuario.apellido = this.usuarioForm.value.apellido;
    this.usuario.email = this.usuarioForm.value.email;
    this.usuario.telefono = this.usuarioForm.value.telefono;

    this.usuarioService.putUsuario(this.usuario)
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

    this.usuarioService.deleteUsuario(this.usuario._id)
      .subscribe(item =>{

        console.log(item);
        this.activeModal.close();      

    }, (err) => {

        console.log(err);
        this.message = err.error.message;
      
    });

  }


}
