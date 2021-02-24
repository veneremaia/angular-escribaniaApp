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
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfiguracionActorComponent } from './configuracion-actor/configuracion-actor.component';
import { NuevocomponentComponent } from './nuevocomponent/nuevocomponent.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    DatosViewComponent,
    FormularioEditComponent,
    ConfiguracionComponent,
    ConfiguracionActosComponent,
    ConfiguracionActorComponent,
    NuevocomponentComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
