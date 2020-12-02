import { Component, Input, OnInit } from '@angular/core';
import { ActoDatosService } from '../acto-datos.service';
import { Datos } from '../formulario-edit/Datos';

@Component({
  selector: 'app-datos-view',
  templateUrl: './datos-view.component.html',
  styleUrls: ['./datos-view.component.scss']
})
export class DatosViewComponent implements OnInit {
 
  datosFinales: Datos[]=[];
  totalComprador : number =0;
  totalVendedor : number=0;
  constructor(private actoDatos: ActoDatosService) {
      actoDatos.actoList.subscribe(d => this.datosFinales= d);
     // this.calcularTotalComprador();
     // this.calcularTotalVendedor();
    }


   /* calcularTotalVendedor(){
      this.totalVendedor= this.datosFinales[1].valorSello+
      this.datosFinales[0].aportes+
      this.datosFinales[0].certificado+
      this.datosFinales[0].municipal+
      this.datosFinales[0].dirigenciamiento+
      this.datosFinales[0].rcd;
      console
    }

    calcularTotalComprador(){
      this.totalVendedor= this.datosFinales[0].valorSello+
      this.datosFinales[0].aportes+
      this.datosFinales[0].honorarios+
      this.datosFinales[0].iva+
      this.datosFinales[0].inscripcion+
      this.datosFinales[0].matricula+
      this.datosFinales[0].folios;
    }
*/
  ngOnInit(): void {
  }

}



/*
certificados folios y valor fisccal y o valor de escrituracion fuera del cuadro
numeros con no mas de 1 decimal
total comprador total vendedor total toda la operacion
logo colescba
colores colescba




*/