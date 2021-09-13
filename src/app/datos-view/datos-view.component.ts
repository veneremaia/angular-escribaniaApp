import { Component, Input, OnInit } from '@angular/core';
import { Actor, Datos } from '../services/api-model';
import { ActoDatosService } from '../services/datos.service';


@Component({
  selector: 'app-datos-view',
  templateUrl: './datos-view.component.html',
  styleUrls: ['./datos-view.component.scss']
})


export class DatosViewComponent implements OnInit {
  datosFinales: Datos[]=[];
  datosActores: Actor[]=[];
  // isShowed a actualizar en el service
  isShowed : boolean = false;
  isPrinted : boolean = false;
  constructor(private datos: ActoDatosService) {
      this.datos.actoList.subscribe(d => this.datosFinales= d);
      this.datos.actoresList.subscribe(d => this.datosActores= d);
      // traigo el dato de si se esta mostrando o consultando
      this.datos.isShowed.subscribe(b =>this.isShowed=b);
      this.datos.isPrinted.subscribe(b =>this.isPrinted=b);

      }




  ngOnInit(): void {
    window.addEventListener('cleanInfo', this.limpiarDatos, true);

  }

  limpiarDatos(){
    if(!this.isShowed){
    this.datosFinales = [];
    this.datosActores = []; 
    this.datos.actualizarIsShowed(false);
    }
  }

  ngOnDestroy () { 
    window.removeEventListener('cleanInfo', this.limpiarDatos, true);

} 

clickModoImprimir(){
  this.isPrinted = true;
  this.datos.actualizarIsPrinted(this.isPrinted);
}
  
}



/*
certificados folios y valor fisccal y o valor de escrituracion fuera del cuadro
numeros con no mas de 1 decimal
total comprador total vendedor total toda la operacion
logo colescba
colores colescba




*/