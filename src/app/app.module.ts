import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// para que funcione el httpclient
import { HttpClientModule } from "@angular/common/http";

//modulos
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './modules/login/login/login.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { CategoriaComponent } from './modules/dashboard/categoria/categoria.component';
import { FooterComponent } from './modules/estructura/footer/footer.component';
import { HeaderComponent } from './modules/estructura/header/header.component';
import { SidebarComponent } from './modules/estructura/sidebar/sidebar.component';
import { ModalAccionCategoriaComponent } from './modules/dashboard/categoria/modal-accion-categoria/modal-accion-categoria.component';
import { CursoComponent } from './modules/dashboard/curso/curso.component';
import { PreguntaComponent } from './modules/dashboard/pregunta/pregunta.component';
import { RespuestaComponent } from './modules/dashboard/respuesta/respuesta.component';
import { UsuarioComponent } from './modules/dashboard/usuario/usuario.component';
import { ModalAccionCursoComponent } from './modules/dashboard/curso/modal-accion-curso/modal-accion-curso.component';
import { LeccionComponent } from './modules/dashboard/leccion/leccion.component';
import { ModalAccionLeccionComponent } from './modules/dashboard/leccion/modal-accion-leccion/modal-accion-leccion.component';
import { ModalAccionUsuarioComponent } from './modules/dashboard/usuario/modal-accion-usuario/modal-accion-usuario.component';
import { MiPerfilComponent } from './modules/dashboard/mi-perfil/mi-perfil.component';
import { MisCursosComponent } from './modules/dashboard/mis-cursos/mis-cursos.component';
import { MisLeccionesComponent } from './modules/dashboard/mis-lecciones/mis-lecciones.component';


import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ModalAccionPreguntaComponent } from './modules/dashboard/pregunta/modal-accion-pregunta/modal-accion-pregunta.component';
import { ModalAccionRespuestaComponent } from './modules/dashboard/respuesta/modal-accion-respuesta/modal-accion-respuesta.component';
import { AdministrarCursoComponent } from './modules/dashboard/usuario/administrar-curso/administrar-curso.component';
import { ModalAdministrarCursoComponent } from './modules/dashboard/usuario/modal-administrar-curso/modal-administrar-curso.component';
import { RegisterComponent } from './modules/login/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    CategoriaComponent,
    CursoComponent,
    LeccionComponent,
    PreguntaComponent,
    RespuestaComponent,
    UsuarioComponent,
    MiPerfilComponent,
    MisCursosComponent,
    MisLeccionesComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ModalAccionCategoriaComponent,
    ModalAccionCursoComponent,
    ModalAccionLeccionComponent,
    ModalAccionUsuarioComponent,
    ModalAccionPreguntaComponent,
    ModalAccionRespuestaComponent,
    AdministrarCursoComponent,
    ModalAdministrarCursoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule, // required animations module
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
