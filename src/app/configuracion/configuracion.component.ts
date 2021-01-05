import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acto } from '../Acto';
import { ActosDataService } from '../actos-data.service';
import { Escribania } from '../Escribaniadatos';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  //Lista de actos desde la API
  actos: Acto[] = [];

  // Escribania desde la API
  escribaniaDatosApi: Escribania[]=[];


  actoActual: Acto = {
    "id": 0,
    "codigo_acto": "",
    "nombre_acto": "",
    "p_sellos": 0,
    "p_honorarios": 0,
    "min_honorarios": 0,
    "p_aportes": 0,
    "min_aportes": 0,
    "p_ganancias": 0,
    "p_iti": 0
  };
  
  constructor(private actosDataService: ActosDataService, private toastr : ToastrService) { 

  }

  ngOnInit(): void {
    this.actosDataService.getAllActos()
    .subscribe(actos =>this.actos = actos);
    this.actosDataService.getDatosEscribania()
    .subscribe(escribania =>this.escribaniaDatosApi = escribania);
  }

  setActo(event: any){  
    this.actoActual = this.getActoById(event.value);
    console.log("id del acto: "+this.actoActual.id);
  }
  
  getActoById(id : any) : any{
    return this.actos.find(a => a.id==id);
   }

   // actualizar valores de acto

   changeCodigo(event: any) : void{
      this.actoActual.codigo_acto=event.target.value;
    }
 
    changeSello(event: any) : void{
      this.actoActual.p_sellos=Number(event.target.value);
    }
    changeHonorarios(event: any) : void{
      this.actoActual.p_honorarios=Number(event.target.value);
    }
    changeMinHonorarios(event: any) : void{
      this.actoActual.min_honorarios=Number(event.target.value);
    }
    changeAportes(event: any) : void{
      this.actoActual.p_aportes=Number(event.target.value);
    }
    changeMinAportes(event: any) : void{
      this.actoActual.min_aportes=Number(event.target.value);
    }
    changeGanancias(event: any) : void{
      this.actoActual.p_ganancias=Number(event.target.value);
    }
    changeIti(event: any) : void{
      this.actoActual.p_iti=Number(event.target.value);
    }

    changeNombreEscribania(event: any) : void{
      this.escribaniaDatosApi[0].nombre=event.target.value;
      console.log(this.escribaniaDatosApi[0].id);
    }
 
    changeMatricula(event: any) : void{
      this.escribaniaDatosApi[0].matricula=Number(event.target.value);
    }
    changeGestor(event: any) : void{
      this.escribaniaDatosApi[0].gestor=Number(event.target.value);
    }
    changeRcd(event: any) : void{
      this.escribaniaDatosApi[0].p_rcd=Number(event.target.value);
    }
    changeMinRcd(event: any) : void{
      this.escribaniaDatosApi[0].min_rcd=Number(event.target.value);
    }
    actualizarDatos(): void{
      if(this.actoActual.id!=0)
        this.actosDataService.updateActo(this.actoActual).subscribe(()=> console.log("anduvo"));
      this.actosDataService.updateDatosEscribania(this.escribaniaDatosApi[0]).subscribe(()=> console.log("anduvo"));
      this.toastr.success("Se actualizaron los datos correctamente")
    }


}

