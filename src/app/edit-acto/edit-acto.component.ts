import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acto } from '../Acto';
import { Actor } from '../Actor';
import { ActosDataService } from '../actos-data.service';

@Component({
  selector: 'app-edit-acto',
  templateUrl: './edit-acto.component.html',
  styleUrls: ['./edit-acto.component.scss']
})
export class EditActoComponent implements OnInit {
  //Lista de actos desde la API
  actos: Acto[] = [];
  actores: Actor[]=[];
  EPaportes : boolean = true;
  EPhonorarios : boolean = true;

  
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
    this.actosDataService.getAllActores()
    .subscribe(actores =>this.actores = actores);

  }

 getActoById(id : any) : any{
    return this.actos.find(a => a.id==id);
   }


  setActo(event: any){  
    this.actoActual = this.getActoById(event.value);
    this.EPaportes = this.actoActual.p_aportes==0;
    this.EPhonorarios = this.actoActual.p_honorarios==0;
    console.log("id del acto: "+this.actoActual.id);
  }

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
      if(this.EPaportes)
        this.actoActual.p_aportes=0;
      if(this.EPhonorarios){
        this.actoActual.p_honorarios=0;
      }
      this.actosDataService.updateActo(this.actoActual).subscribe(()=> console.log("anduvo"));
      this.toastr.success("El acto se actualizó correctamente");
  }
  setAporteEscala() : void {
    this.EPaportes = (this.EPaportes) ? false : true;
  }
  setHonorarioEscala() : void {
    this.EPhonorarios = (this.EPhonorarios) ? false : true;
  }

  reset(): void{
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
