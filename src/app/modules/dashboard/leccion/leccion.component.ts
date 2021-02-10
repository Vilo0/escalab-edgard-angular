import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/services/login.service';
import { LeccionService } from '../../../core/services/leccion.service';
import { ModalAccionLeccionComponent } from './modal-accion-leccion/modal-accion-leccion.component';

@Component({
  selector: 'app-leccion',
  templateUrl: './leccion.component.html',
  styleUrls: ['./leccion.component.scss']
})
export class LeccionComponent implements OnInit {

  closeResult = '';

  public listaLecciones:any = [];
  miCurso:any = null;

  constructor(
    private leccionService: LeccionService, 
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router) { }

  open(leccion, accion) {

    const modalRef = this.modalService.open(ModalAccionLeccionComponent);
    modalRef.componentInstance.leccion = leccion;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getLecciones();
    }, (reason) => {
      // on dismiss
    });

  }

  private getLecciones(){

    this.leccionService.getLecciones().subscribe( item => {

      this.listaLecciones = item.data;

      if(!item.result){
        this.toastr.error('Hubo un error al Cargar la data', '');
      }

      else{
        if(this.listaLecciones.length > 0){
          this.toastr.success('Lecciones cargadas correctamente!', '');
        }
        else{
          this.toastr.warning('No se encontraron lecciones', '');
        }
      }

    });

  }

  private getLeccionesCurso(idCurso){

    this.leccionService.getLeccionesCurso(idCurso).subscribe( item => {

      this.listaLecciones = item.data;
      this.miCurso = item.curso;

      if(this.listaLecciones.length > 0){
        this.toastr.success('', 'Lecciones cargadas correctamente!');
      }
      else{
        this.toastr.warning('', 'No se encontraron lecciones');
      }
      

    });

  }

  ngOnInit() {

    if(this.loginService.estaAutenticado()){

      this.route.paramMap.subscribe(params => {

        const cursoId = params.get("cursoId");

        if(cursoId == null){
          this.getLecciones();
        }
        else{
          this.getLeccionesCurso(cursoId);
        }

      });

    }
    else{
      this.router.navigateByUrl('/login');
    } 

  }

}

