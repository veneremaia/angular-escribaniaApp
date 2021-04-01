import { Component } from '@angular/core';
import { ActoDatosService } from './datos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent {
  title = 'escribaniaApp';

    // isPrinted a actualizar en el service
    isPrinted : boolean = false;
    // isShowed a actualizar en el service
    isShowed : boolean = false;


  constructor(private actoService: ActoDatosService) { 
        // traigo el dato de si se esta en modo imprimir
        this.actoService.isPrinted.subscribe(b =>this.isPrinted=b);
        // traigo el dato de si se esta mostrando o consultando
        this.actoService.isShowed.subscribe(b =>this.isShowed=b);

  }


  notPrinted() : void{
    this.isPrinted = false;
    this.isShowed = false;
    this.actoService.actualizarIsPrinted(this.isPrinted);
    this.actoService.actualizarIsShowed(this.isShowed);
  }

}

