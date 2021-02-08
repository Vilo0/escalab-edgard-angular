import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PreguntaService } from '../../../core/services/pregunta.service';
import { ModalAccionPreguntaComponent } from './modal-accion-pregunta/modal-accion-pregunta.component';
import { LoginService } from '../../../core/services/login.service';
import { ModalAccionRespuestaComponent } from '../respuesta/modal-accion-respuesta/modal-accion-respuesta.component';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.scss']
})
export class PreguntaComponent implements OnInit {

  closeResult = '';

  public listaPreguntas:any = [];
  miLeccion:any = null;

  constructor(
    private preguntaService: PreguntaService, 
    private loginService: LoginService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router) { }

  open(pregunta, accion) {

    const modalRef = this.modalService.open(ModalAccionPreguntaComponent);
    modalRef.componentInstance.pregunta = pregunta;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getPreguntas();
    }, (reason) => {
      // on dismiss
    });

  }

  private getPreguntas(){

    this.preguntaService.getPreguntas().subscribe( item => {

      this.listaPreguntas = item.data;

      if(this.listaPreguntas.length > 0){
        this.toastr.success('', 'Preguntas cargadas correctamente!');
      }
      else{
        this.toastr.warning('', 'No se encontraron preguntas');
      }

    });

  }

  private getPreguntasLeccion(idLeccion){

    this.preguntaService.getPreguntasLeccion(idLeccion).subscribe( item => {

      this.listaPreguntas = item.data;
      this.miLeccion = item.leccion;

      if(this.listaPreguntas.length > 0){
        this.toastr.success('', 'Preguntas cargadas correctamente!');
      }
      else{
        this.toastr.warning('', 'No se encontraron preguntas');
      }
      

    });

  }

  ngOnInit() {

    if(!this.loginService.estaAutenticado()){
      this.router.navigateByUrl('/login');
    }

    this.route.paramMap.subscribe(params => {

      const leccionId = params.get("leccionId");

      if(leccionId == null){
        this.getPreguntas();
      }
      else{
        this.getPreguntasLeccion(leccionId);
      }

    });

  }

  openRespuesta(idPregunta, accion) {

    const modalRef = this.modalService.open(ModalAccionRespuestaComponent);
    modalRef.componentInstance.respuesta = null;
    modalRef.componentInstance.idPregunta = idPregunta;
    modalRef.componentInstance.accion = accion;

    modalRef.result.then((data) => {
      // on close
      this.getPreguntas();
    }, (reason) => {
      // on dismiss
    });

  }

}
