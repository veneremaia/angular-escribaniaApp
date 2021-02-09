import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DatosViewComponent } from './datos-view/datos-view.component';
import { FormularioEditComponent } from './formulario-edit/formulario-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfiguracionActosComponent } from './configuracion-actos/configuracion-actos.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    DatosViewComponent,
    FormularioEditComponent,
    ConfiguracionComponent,
    ConfiguracionActosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
