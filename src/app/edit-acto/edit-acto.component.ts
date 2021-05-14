import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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


  
  formEdicionActo = new FormGroup({
    codigo : new FormControl('', Validators.required),
    p_sellos : new FormControl('', Validators.required),
    p_ganancias : new FormControl('', Validators.required),
    p_iti : new FormControl('', Validators.required),
    escala_honorarios : new FormControl('', Validators.required),
    p_honorarios : new FormControl('', Validators.required),
    min_honorarios : new FormControl('', Validators.required),
    aporte_escala : new FormControl('', Validators.required),
    aporte_escala_completa : new FormControl('', Validators.required),
    aporte_escala_media : new FormControl('', Validators.required),
    p_aporte : new FormControl('', Validators.required),
    min_aporte : new FormControl('', Validators.required)


  });

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
    this.EPaportes = this.actoActual.p_aportes<0;
    this.EPhonorarios = this.actoActual.p_honorarios<0;
    console.log("id del acto: "+this.actoActual.id);
    this.updateForm();
  }
  updateForm(): void{
    this.formEdicionActo = new FormGroup({
      codigo : new FormControl(this.actoActual.codigo_acto, Validators.required),
      p_sellos : new FormControl(this.actoActual.p_sellos, Validators.required),
      p_ganancias : new FormControl(this.actoActual.p_ganancias, Validators.required),
      p_iti : new FormControl(this.actoActual.p_iti, Validators.required),
      escala_honorarios : new FormControl(this.EPhonorarios, Validators.required),
      p_honorarios : new FormControl(this.actoActual.p_honorarios, Validators.required),
      min_honorarios : new FormControl(this.actoActual.min_honorarios, Validators.required),
      aporte_escala : new FormControl(this.EPaportes, Validators.required),
      aporte_escala_completa : new FormControl(this.actoActual.p_aportes==-1, Validators.required),
      aporte_escala_media : new FormControl(this.actoActual.p_aportes==-2, Validators.required),
      p_aporte : new FormControl(this.actoActual.p_aportes, Validators.required),
      min_aporte : new FormControl(this.actoActual.min_aportes, Validators.required)
  
  
    });  }

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
  setHonorarios(): void {
    if(this.formEdicionActo.value.escala_honorarios==true){
      this.actoActual.p_honorarios = -1;
      this.actoActual.min_honorarios = 0;
    }
    else{
      this.actoActual.p_honorarios = Number(this.formEdicionActo.value.p_honorarios);
      this.actoActual.min_honorarios = Number(this.formEdicionActo.value.min_honorarios);
    }
  }

  setAporteEscala(): void{
    if(this.formEdicionActo.value.aporte_escala==true){
      if(this.formEdicionActo.value.aporte_escala_completa==true)
        this.actoActual.p_aportes = -1;      
      else
        this.actoActual.p_aportes = -2;
      this.actoActual.min_aportes = 0;      
    }
    else{
      this.actoActual.p_aportes = Number(this.formEdicionActo.value.p_aporte);
      this.actoActual.min_aportes = Number(this.formEdicionActo.value.min_aporte);
    }
  }

  actualizarDatos(): void{
      this.actoActual.codigo_acto = this.formEdicionActo.value.codigo;
      this.actoActual.p_sellos = Number(this.formEdicionActo.value.p_sellos);
      this.actoActual.p_ganancias = Number(this.formEdicionActo.value.p_ganancias);
      this.actoActual.p_iti = Number(this.formEdicionActo.value.p_iti);
      this.EPaportes = this.formEdicionActo.value.aporte_escala;
      this.setHonorarios();
      this.setAporteEscala();
      this.actosDataService.updateActo(this.actoActual).subscribe(()=> console.log("anduvo"));
      this.toastr.success("El acto se actualizó correctamente");
  }
 
  setPoseeEscalaAportes(){
    this.EPaportes = (this.EPaportes) ? false : true;
    this.formEdicionActo.value.aporte_escala = this.EPaportes;
  }
  setEscalaCompleta(): void{
    this.actoActual.p_aportes = -1;
    this.formEdicionActo.value.aporte_escala_media = false;
    this.formEdicionActo.value.aporte_escala_completa = true;
  }
  setMediaEscala(): void{
    this.actoActual.p_aportes = -2;
    this.formEdicionActo.value.aporte_escala_completa = false;
    this.formEdicionActo.value.aporte_escala_media = true;

  }
  setHonorarioEscala() : void {
    this.EPhonorarios = (this.EPhonorarios) ? false : true;
    if(!this.EPhonorarios)
      this.actoActual.p_honorarios = 0;
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
