import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Acto } from '../Acto';
import { ActosDataService } from '../actos-data.service';

@Component({
  selector: 'app-create-acto',
  templateUrl: './create-acto.component.html',
  styleUrls: ['./create-acto.component.scss']
})
export class CreateActoComponent implements OnInit {

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

  EPaportes : boolean = false;
  EPhonorarios : boolean = false;
  constructor(private actosDataService: ActosDataService, private toastr : ToastrService) { }

  ngOnInit(): void {
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
      this.actosDataService.createActo(this.actoActual).subscribe(()=> console.log("anduvo"));
      this.toastr.success("El acto se creó correctamente");
  
  }

  setAporteEscala(): void{
    this.EPaportes = (this.EPaportes) ? false : true;
    
  }

  setEscalaCompleta(): void{
    this.actoActual.p_aportes = -1;
    this.actoActual.min_aportes = 0;
  }
  setMediaEscala(): void{
    this.actoActual.p_aportes = -2;
    this.actoActual.min_aportes = 0;
  }

  setHonorarioEscala(): void{
    this.EPhonorarios = (this.EPhonorarios) ? false : true;
    this.actoActual.p_honorarios = 0;
    this.actoActual.min_honorarios = 0;
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
