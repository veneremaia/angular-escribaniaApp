import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiguracionActosComponent } from './configuracion-actos/configuracion-actos.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch:'full'
  },
  {
    path:'formulario',
    component: FormularioComponent
  },
  {
    path:'configuracionEscribania',
    component: ConfiguracionComponent
  },
  {
    path:'configuracionActos',
    component: ConfiguracionActosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
