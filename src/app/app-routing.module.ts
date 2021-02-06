import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login/login.component';
import { HomeComponent } from './modules/dashboard/home/home.component';
import { CategoriaComponent } from './modules/dashboard/categoria/categoria.component';
import { CursoComponent } from './modules/dashboard/curso/curso.component';
import { PreguntaComponent } from './modules/dashboard/pregunta/pregunta.component';
import { RespuestaComponent } from './modules/dashboard/respuesta/respuesta.component';
import { UsuarioComponent } from './modules/dashboard/usuario/usuario.component';
import { LeccionComponent } from './modules/dashboard/leccion/leccion.component';
import { MiPerfilComponent } from './modules/dashboard/mi-perfil/mi-perfil.component';
import { MisCursosComponent } from './modules/dashboard/mis-cursos/mis-cursos.component';
import { MisLeccionesComponent } from './modules/dashboard/mis-lecciones/mis-lecciones.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full', },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'curso', component: CursoComponent },
  { path: 'leccion', component: LeccionComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'respuesta', component: RespuestaComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'mi-perfil', component: MiPerfilComponent },
  { path: 'mis-cursos', component: MisCursosComponent },
  { path: 'mis-lecciones', component: MisLeccionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
