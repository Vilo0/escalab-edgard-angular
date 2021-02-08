import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../../../../core/services/respuesta.service';
import { LoginService } from '../../../../core/services/login.service';

@Component({
  selector: 'app-modal-accion-respuesta',
  templateUrl: './modal-accion-respuesta.component.html',
  styleUrls: ['./modal-accion-respuesta.component.scss']
})
export class ModalAccionRespuestaComponent implements OnInit {

  @Input() pregunta;
  @Input() accion;
  @Input() idPregunta = '';

  usuario:any = null;

  message:string = '';

  nuevaRespuesta:any = {
    descripcion: '',
    imagen: null,
    preguntaId: ''
  };

  public respuestaForm:any;

  descripcion:string = '';
  preguntaId:string = '';
  imagen:string = null;
  file:any;


  constructor(
    public activeModal: NgbActiveModal, 
    private cb: FormBuilder,
    private respuestaService: RespuestaService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

    this.usuario = this.loginService.getUsuario();

    if(this.idPregunta != ''){
      this.preguntaId = this.idPregunta;
    }

    this.respuestaForm = this.cb.group({
      descripcion: [this.descripcion, [ Validators.required]],
      imagen: [null, [ Validators.required]],
    });

  }

  onFileChanged(event) {
    this.file = event.target.files[0];
    
    var reader = new FileReader();
    reader.onload = (event: any) => {
        this.imagen = event.target.result;
        console.log(this.imagen);
    }
    reader.readAsDataURL(event.target.files[0]);

  }


  agregar() {


    this.nuevaRespuesta.descripcion = this.respuestaForm.value.descripcion;
    this.nuevaRespuesta.imagen = this.imagen;
    this.nuevaRespuesta.preguntaId = this.preguntaId;

    this.respuestaService.postRespuesta(this.nuevaRespuesta, this.usuario._id)
      .subscribe(item =>{

        console.log(item);
         this.activeModal.close();      

     }, (err) => {

         console.log(err);
         this.message = err.error.message;
      
     });

  }


}
