import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from '../../../core/services/usuario.service';
import { ModalAccionUsuarioComponent } from './modal-accion-usuario/modal-accion-usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  closeResult = '';

  public listaUsuarios:any = [];

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal) { }

  open(usuario, accion) {

    const modalRef = this.modalService.open(ModalAccionUsuarioComponent);
    modalRef.componentInstance.usuario = usuario;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getUsuarios();
    }, (reason) => {
      // on dismiss
    });

  }

  private getUsuarios(){

    this.usuarioService.getUsuarios().subscribe( item => {

      this.listaUsuarios = item.data;

      console.log(this.listaUsuarios);

    });

  }

  ngOnInit() {

    this.getUsuarios();

  }

}
