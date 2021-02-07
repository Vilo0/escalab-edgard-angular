import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { LeccionService } from '../../../core/services/leccion.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { PreguntaService } from '../../../core/services/pregunta.service';
import { RespuestaService } from '../../../core/services/respuesta.service';

@Component({
  selector: 'app-mis-lecciones',
  templateUrl: './mis-lecciones.component.html',
  styleUrls: ['./mis-lecciones.component.css']
})
export class MisLeccionesComponent implements OnInit {

  @Input() output;

  idUsuario:string = '601f1570ccb54906a47796d7';
  idCurso:string = '';
  listaLecciones:any = [];
  resultado:any;

  nombreLeccion:string = '';
  descripcionLeccion:string = '';
  urlLeccion:string = '';
  idLeccion:string = '';
  completo:boolean = false;

  misLeccionesCompletadas:any = [];
  preguntas:any = [];
  respuestas:any = [];

  mostrarPreguntas:boolean = false;
  mostrarRespuestas:boolean = false;

  constructor(
    private leccionService: LeccionService, 
    private usuarioService: UsuarioService,
    private preguntaService: PreguntaService,
    private respuestaService: RespuestaService,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.misLeccionesCompletadas = this.usuarioService.obtenerLecciones();

    this.route.paramMap.subscribe(params => {

      this.idCurso = params.get("cursoId");

      this.getLeccionesCurso(this.idCurso);

    });

    console.log(this.misLeccionesCompletadas);

  }

  private getLeccionesCurso(id){

    this.leccionService.getLeccionesCurso(id).subscribe( item => {

      this.listaLecciones = item.data;

      console.log(this.listaLecciones);

    });

  }

  detalleLeccion(leccion){

    console.log(leccion);

    this.nombreLeccion = leccion.nombre;
    this.descripcionLeccion = leccion.descripcion;
    this.urlLeccion = leccion.documento;
    this.idLeccion = leccion._id;

    console.log(this.idLeccion);

    // let estaCompleto = this.misLeccionesCompletadas.findIndex(item => {

    //   return this.idLeccion.toString() === item.leccionId.toString();

    // });

    // if(estaCompleto >= 0){
    //   this.completo = true;
    // }else{
    //   this.completo = false;
    // }

  }

  completarLeccion(idLeccion){

    this.usuarioService.completarLeccion(this.idUsuario, idLeccion).subscribe( item => {

      this.resultado = item.data;

      console.log(this.resultado);

    })

  }

  noCompletarLeccion(idLeccion){

    this.usuarioService.noCompletarLeccion(this.idUsuario, idLeccion).subscribe( item => {

      this.resultado = item.data;

      this.mostrarPreguntas = true;

      console.log(this.resultado);

    })

  }

  verPreguntas(idLeccion){

    this.preguntaService.getPreguntasLeccion(idLeccion).subscribe( item => {

      this.preguntas = item.data;

      this.mostrarPreguntas = true;

      console.log(this.preguntas);

    });

  }


  verRespuestas(idPregunta){

    this.respuestaService.getRespuestasPregunta(idPregunta).subscribe( item => {

      this.respuestas = item.data;

      this.mostrarRespuestas = true;

      console.log(this.respuestas);

    });

  }

  ocultar(){

    this.mostrarPreguntas = false;
    this.mostrarRespuestas = false;

  }

}
