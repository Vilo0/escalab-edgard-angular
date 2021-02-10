import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../core/services/usuario.service';
import { LoginService } from '../../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  miUsuario:any = null;

  public perfilForm:any;

  constructor(
    private cb: FormBuilder,
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    if(this.loginService.estaAutenticado()){

      this.perfilForm = this.cb.group({
        nombre: ['', [ Validators.required]],
        apellido: ['', [ Validators.required]],
        email: ['', [ Validators.required]],
        telefono: ['', [ Validators.required]],
        password: ['', [Validators.minLength(6)]],
        confirmarPassword: ['', [ Validators.minLength(6), this.matchValues('password') ]]
      });

      let usuario = this.loginService.getUsuario();

      this.getUsuario(usuario._id);

    }
    else{
      this.router.navigateByUrl('/login');
    } 

  }

  private getUsuario(idUsuario){

    this.usuarioService.getUsuarioId(idUsuario).subscribe( item => {

      console.log(item);

      if(item.result){

        this.miUsuario = item.data;

        console.log(this.miUsuario.nombre);

        this.perfilForm.setValue( { 
          nombre: this.miUsuario.nombre,
          apellido: this.miUsuario.apellido,
          email: this.miUsuario.email,
          telefono: this.miUsuario.telefono,
          password: null,
          confirmarPassword: null
        } );

      }

    });

  }

  editarPerfil(){

    this.miUsuario.nombre = this.perfilForm.value.nombre;
    this.miUsuario.descripcion = this.perfilForm.value.descripcion;
    this.miUsuario.telefono = this.perfilForm.value.telefono;
    this.miUsuario.email = this.perfilForm.value.email;

    this.usuarioService.putUsuario(this.miUsuario).subscribe( item => {

      if(item.result){
        this.toastr.success('Usuario actualizado correctamente', '');
      }
      else{
        this.toastr.error('Hubo un problema al actualizar el usuario', '');
      }

    });

  }


  private matchValues( matchTo: string // name of the control to match to
                  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

}
