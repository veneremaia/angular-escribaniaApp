import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActosDataService } from '../services/actos-data.service';
import { Escala } from '../services/api-model';

@Component({
  selector: 'app-escala-porcentual',
  templateUrl: './escala-porcentual.component.html',
  styleUrls: ['./escala-porcentual.component.scss'],
})
export class EscalaPorcentualComponent implements OnInit {
  //Lista de escalas desde la API
  escalas: Escala[] = [];
  displayedColumns: string[] = [
    'min',
    'max',
    'aporte_fijo',
    'porcentaje_excedente',
  ];
  editable = false;
  dataSource = this.escalas;

  constructor(
    private actosDataService: ActosDataService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.actosDataService.getAllEscalas().subscribe((escalas) => {
      this.escalas = escalas;
      this.dataSource = escalas;
    });
  }

  actualizarDatos() {
    this.actosDataService.getAllEscalas().subscribe((escalas) => {
      this.escalas = escalas;
      this.dataSource = escalas;
    });
  }
  clickEditar() {
    this.editable = true;
  }

  clickCancelar() {
    this.editable = false;
  }

  changeMax(event: any, escala: number) {
    this.escalas.forEach((e) => {
      if (e.id == escala) {
        e.max = Number(event.target.value);
        console.log(e);
      }
    });
  }

  clickConfirmar(): void {
    console.log(this.escalas);
    this.escalas.forEach((escala) => {
      this.actosDataService
        .updateEscala(escala)
        .subscribe(() => console.log('anduvo'));
    });
    //this.actualizarDatos();
    this.editable = false;

    this.toastr.success('Se actualizaron los datos correctamente');
  }
}
