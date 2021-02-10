import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public message=null;

  public registroForm = this.fb.group({
    nombre: ['',[ Validators.required, Validators.minLength(4)]],
    apellido: ['',[ Validators.required, Validators.minLength(4)]],
    email: ['',[ Validators.required, Validators.email]],
    telefono: ['',[ Validators.minLength(6)]],
    password: ['', Validators.required]
  });

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ){}



  registro(){

    const usuario = {
      nombre: this.registroForm.value.nombre,
      apellido: this.registroForm.value.apellido,
      email: this.registroForm.value.email,
      telefono: this.registroForm.value.telefono,
      password: this.registroForm.value.password
    }

    this.loginservice.signin(usuario)
      .subscribe(item =>{

        if(item){
          this.toastr.success('Usuario registrado correctamente, use sus datos para iniciar sesión', '');
          this.router.navigateByUrl('/login');
        }
      
    }, (err) => {
      console.log(err);
      this.message = err.error.message;
    });
  }

  ngOnInit() {
  }

}
