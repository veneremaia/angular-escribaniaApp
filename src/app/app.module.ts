import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormularioComponent } from './formulario/formulario.component';
import { DatosViewComponent } from './datos-view/datos-view.component';
import { FormularioEditComponent } from './formulario-edit/formulario-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    DatosViewComponent,
    FormularioEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
