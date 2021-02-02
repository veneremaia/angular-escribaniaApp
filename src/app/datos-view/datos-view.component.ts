import { Component, Input, OnInit } from '@angular/core';
import { Actor } from '../Actor';
import { ActosDataService } from '../actos-data.service';
import { ActoDatosService } from '../datos.service';
import { Datos } from '../formulario-edit/Datos';

@Component({
  selector: 'app-datos-view',
  templateUrl: './datos-view.component.html',
  styleUrls: ['./datos-view.component.scss']
})
export class DatosViewComponent implements OnInit {
  datosFinales: Datos[]=[];
  datosActores: Actor[]=[];

  constructor(private datos: ActoDatosService) {
      this.datos.actoList.subscribe(d => this.datosFinales= d);
      this.datos.actoresList.subscribe(d => this.datosActores= d);

      }




  ngOnInit(): void {
  }

  restablecer(){
    
    
  }
  
}



/*
certificados folios y valor fisccal y o valor de escrituracion fuera del cuadro
numeros con no mas de 1 decimal
total comprador total vendedor total toda la operacion
logo colescba
colores colescba




*/