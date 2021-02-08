import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  usuario:any = {};

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit() {

    this.usuario = this.loginService.getUsuario();

  }

}
