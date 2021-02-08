import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CursoService } from 'src/app/core/services/curso.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { LoginService } from '../../../../core/services/login.service';
import { ModalAdministrarCursoComponent } from '../modal-administrar-curso/modal-administrar-curso.component';

@Component({
  selector: 'app-administrar-curso',
  templateUrl: './administrar-curso.component.html',
  styleUrls: ['./administrar-curso.component.css']
})
export class AdministrarCursoComponent implements OnInit {

  closeResult = '';

  public listaCursos:any = [];
  usuario:any;
  usuarioId:string = '';

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  private getCursosUsuario(idUsuario){

    this.usuarioService.getUsuarioId(idUsuario).subscribe( item => {

      this.listaCursos = item.data.cursos.items;

      if(!item.result){
        this.toastr.error('Hubo un error al cargar la data', '');
      }

      else{
        if(this.listaCursos.length > 0){
          this.toastr.success('Cursos cargados correctamente!', '');
        }
        else{
          this.toastr.warning('No se encontraron cursos', '');
        }
      }

    });

  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {

      this.usuarioId = params.get("usuarioId");

      this.usuario = this.loginService.getUsuario();

      console.log('usuarioId es:', this.usuarioId);

      if(this.usuarioId == null){
      }
      else{
        this.getCursosUsuario(this.usuarioId);
      }

    });

  }


  open(curso, accion) {

    const modalRef = this.modalService.open(ModalAdministrarCursoComponent);
    modalRef.componentInstance.cursos = this.listaCursos;
    modalRef.componentInstance.usuarioId = this.usuarioId;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getCursosUsuario(this.usuarioId);
    }, (reason) => {
      // on dismiss
      this.getCursosUsuario(this.usuarioId);
    });

  }

  activarCurso(idCurso){

    this.usuarioService.activarCurso(this.usuarioId, idCurso).subscribe( item => {

      console.log(item);

      if(item.result){

        this.getCursosUsuario(this.usuarioId);
        this.toastr.success('Curso Activado Correctamente', '');
      }

    });

  }

  desactivarCurso(idCurso){

    this.usuarioService.desactivarCurso(this.usuarioId, idCurso).subscribe( item => {

      if(item.result){

        this.getCursosUsuario(this.usuarioId);
        this.toastr.success('Curso Desactivado Correctamente', '');
      }

    });

  }

}
