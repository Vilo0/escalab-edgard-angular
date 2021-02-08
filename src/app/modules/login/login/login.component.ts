import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public message=null;

  public loginForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(
    private loginservice: LoginService,
    private fb: FormBuilder,
    private router: Router
  ){}



  login(){
    this.loginservice.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(item =>{
        console.log(item);
        this.router.navigateByUrl('/dashboard');
    }, (err) => {
          console.log(err);
      this.message = err.error.message;
      
    });
  }

  ngOnInit() {
  }

}
