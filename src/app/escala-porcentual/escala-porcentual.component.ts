import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActosDataService } from '../actos-data.service';
import { Escala } from '../Escala';

@Component({
  selector: 'app-escala-porcentual',
  templateUrl: './escala-porcentual.component.html',
  styleUrls: ['./escala-porcentual.component.scss']
})
export class EscalaPorcentualComponent implements OnInit {

    //Lista de escalas desde la API
    escalas: Escala[] = [];

  constructor(private actosDataService: ActosDataService, private toastr : ToastrService) { }

  ngOnInit(): void {
    this.actosDataService.getAllEscalas()
    .subscribe(escalas =>this.escalas = escalas);
  }

}
