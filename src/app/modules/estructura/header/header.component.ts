import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario:any = {};

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

    this.usuario = this.loginService.getUsuario();

  }

  

}
