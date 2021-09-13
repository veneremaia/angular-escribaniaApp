import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActosDataService } from '../services/actos-data.service';
import { Acto, Actor } from '../services/api-model';

@Component({
  selector: 'app-configuracion-actos',
  templateUrl: './configuracion-actos.component.html',
  styleUrls: ['./configuracion-actos.component.scss']
})
export class ConfiguracionActosComponent implements OnInit {

  //Lista de actos desde la API
  actos: Acto[] = [];
  // Lista de actores desde la API
  actores: Actor[]=[];
  editar : boolean = false;
  crear : boolean = false;
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
  constructor(private actosDataService: ActosDataService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.actosDataService.getAllActos()
    .subscribe(actos =>this.actos = actos);
    this.actosDataService.getAllActores()
    .subscribe(actores =>this.actores = actores);

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

    changeNombre(event: any) : void{
      this.actoActual.nombre_acto=event.target.value.toUpperCase();
    }

    actualizarDatos(): void{
      if(this.actoActual.id!=0){
        this.actosDataService.updateActo(this.actoActual).subscribe(()=> console.log("anduvo"));
        this.toastr.success("El acto se actualizó correctamente");
        this.editar = false;
      }
      else if(this.crear){
        this.actosDataService.createActo(this.actoActual).subscribe(()=> console.log("anduvo"));
        this.toastr.success("El acto se creó correctamente");
        this.crear = false;
      }
    }
    editarActor(){

    }

    setEditar(){
      this.editar = true;
    }
    setCrear(){
      this.crear = true;
    }
    volver(){
      this.crear=false;
      this.editar=false;
      this.actoActual = {
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
    }
}
