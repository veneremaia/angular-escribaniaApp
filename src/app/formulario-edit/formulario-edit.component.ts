import { Component, OnInit } from '@angular/core';
import { ActoDatosService } from '../services/datos.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Acto,
  ActoActores,
  Actor,
  ActorEditable,
  Datos,
  Escala,
  Escribania,
} from '../services/api-model';
import { ActosDataService } from '../services/actos-data.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-edit',
  templateUrl: './formulario-edit.component.html',
  styleUrls: ['./formulario-edit.component.scss'],
})
export class FormularioEditComponent implements OnInit {
  today: Date = new Date();
  fechaActual: String = '';
  //Lista de actos desde la API
  actosApi: Acto[] = [];
  // Actores desde la API
  listaActoresApi: Actor[] = [];
  // Escribania desde la API
  escribaniaDatosApi: Escribania[] = [];
  // Datos escala porcentual API
  escalaPorcentualApi: Escala[] = [];
  formCalculador!: FormGroup;

  actosActores: ActoActores[] = [];
  // Dato final que mostraremos en resultados
  listaActos: String = '';
  tieneSello: boolean = false;
  tieneGanancia: boolean = false;
  tieneIti: boolean = false;
  tieneCoti: boolean = false;
  tieneItgb: boolean = false;
  tieneImpuestoCedular: boolean = false;
  cantFolios: number = 0;
  cantCertificados: number = 0;
  cantMunicipal: number = 0;
  // isShowed a actualizar en el service
  isShowed: boolean = false;
  // isPrinted a actualizar en el service
  isPrinted: boolean = false;

  filteredOptions: Observable<Acto[]>[] = [];
  constructor(
    private actoService: ActoDatosService,
    private actosDataService: ActosDataService,
    private fb: FormBuilder
  ) {
    var dd = String(this.today.getDate()).padStart(2, '0');
    var mm = String(this.today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = this.today.getFullYear();
    this.fechaActual = dd + '/' + mm + '/' + yyyy;
  }

  ngOnInit(): void {
    this.createForm();
    // traigo todos los actos de la api
    this.actosDataService.getAllActos().subscribe((actos) => {
      this.actosApi = actos;
      this.actosApi = this.actosApi.sort((obj1: Acto, obj2: Acto) => {
        if (obj1.nombre_acto.toLowerCase() > obj2.nombre_acto.toLowerCase()) {
          return 1;
        }
        if (obj1.nombre_acto.toLowerCase() < obj2.nombre_acto.toLowerCase())
          return -1;
        return 0;
      });
    });

    // traigo la escala porcentual de la api
    this.actosDataService
      .getAllEscalas()
      .subscribe((escala) => (this.escalaPorcentualApi = escala));
    // traigo todos los actores de la api
    this.actosDataService
      .getAllActores()
      .subscribe((actores) => (this.listaActoresApi = actores));
    // traigo los datos de la escribania de la api
    this.actosDataService
      .getDatosEscribania()
      .subscribe((escribania) => (this.escribaniaDatosApi = escribania));
    // traigo el dato de si se esta mostrando o consultando
    this.actoService.isShowed.subscribe((b) => (this.isShowed = b));
    // traigo el dato de si se esta en modo imprimir
    this.actoService.isPrinted.subscribe((b) => (this.isPrinted = b));
  }

  createForm() {
    this.formCalculador = this.fb.group({
      acto: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      certificados: ['', [Validators.required]],
      municipal: ['', [Validators.required]],
      folios: ['', [Validators.required]],
      sellos: [''],
      ganancias: [''],
      iti: [''],
      coti: [''],
      itgb: [''],
      impuesto_cedular: [''],
      nombreCliente: ['', [Validators.required]],
      actosArray: this.initActos(),
    });
    this.ManageNameControl(0);
  }

  initActos() {
    var formArray = this.fb.array([]);

    for (let i = 0; i < 1; i++) {
      formArray.push(
        this.fb.group({
          acto: ['', [Validators.required]],
        })
      );
    }
    return formArray;
  }

  addNewItem() {
    const controls = <FormArray>this.formCalculador.controls['actosArray'];
    let formGroup = this.fb.group({
      acto: ['', [Validators.required]],
    });
    controls.push(formGroup);
    // Build the account Auto Complete values
    this.ManageNameControl(controls.length - 1);
  }

  removeItem(i: number) {
    const controls = <FormArray>this.formCalculador.controls['actosArray'];
    controls.removeAt(i);
    // remove from filteredOptions too.
    this.filteredOptions.splice(i, 1);
  }

  ManageNameControl(index: number) {
    let arrayControl = this.formCalculador.get('actosArray') as FormArray;
    this.filteredOptions[index] = arrayControl
      .at(index)
      .get('acto')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value))
      );
  }

  goToForm(): void {
    this.isPrinted = false;
    this.actoService.actualizarIsPrinted(this.isPrinted);
  }

  _filter(value: any): Acto[] {
    const filterValue = value.toLowerCase();

    return this.actosApi.filter((option) =>
      option.nombre_acto.toLowerCase().includes(filterValue)
    );
  }

  // Setear certificados a todos los actores
  setCertificados(value: number, index: number) {
    this.cantCertificados = Number(value);
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.certificados) {
        // todo el valor
        actor.certificados = value * this.escribaniaDatosApi[0].certificado;
        actor.hasCertificados = true;
      }
    });
  }

  // Setear municipal a todos los actores
  setCertificadosMunicipal(value: number, index: number) {
    this.cantMunicipal = Number(value);
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.municipal) {
        // todo el valor
        actor.municipal = value * this.escribaniaDatosApi[0].imp_municipal;
        actor.hasMunicipal = true;
      }
    });
  }

  // Setear folios a todos los actores
  setFolios(value: number, index: number) {
    this.cantFolios = Number(value);
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.folios) {
        // todo el valor
        actor.folios = (value * 2 + 2) * this.escribaniaDatosApi[0].folio;
        actor.hasFolios = true;
      }
    });
  }

  // Setear valor de sello a los actores
  calcularSello(index: number): void {
    if (this.tieneSello) {
      let cant = 0;
      this.actosActores[index].actores.forEach((actor) => {
        if (actor.actor.sellos) cant++;
      });
      if (cant != 0) {
        this.actosActores[index].actores.forEach((actor) => {
          if (actor.actor.sellos) {
            actor.sello =
              (this.actosActores[index].datos.valor *
                this.actosActores[index].datos.acto.p_sellos) /
              100 /
              cant;
            actor.hasSello = true;
          }
        });
      }
    }
  }

  // Calcular honorarios
  calcularHonorarios(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      // si le corresponde pagar honorarios
      if (actor.actor.honorarios) {
        actor.hasHonorarios = true;
        if (this.actosActores[index].datos.acto.p_honorarios < 0) {
          // por escala
          // Si el valor de escritura es menor o igual al minimo puesto por la escala porcentual de honorarios
          if (
            this.actosActores[index].datos.valor <=
            this.escribaniaDatosApi[0].min_valor_escritura_he
          ) {
            // Se setea el minimo establecido
            actor.honorarios =
              this.escribaniaDatosApi[0].min_valor_honorario_escala;
          } else {
            // Se setea el minimo establecido mas el excedente
            let excedente =
              this.actosActores[index].datos.valor -
              this.escribaniaDatosApi[0].min_valor_escritura_he;
            actor.honorarios =
              this.escribaniaDatosApi[0].min_valor_honorario_escala +
              excedente *
                this.escribaniaDatosApi[0].p_honorario_escala_exedente;
          }
        } else {
          // Sin escala
          // Si es mayor al minimo de honorarios establecido por el acto
          if (
            (this.actosActores[index].datos.valor *
              this.actosActores[index].datos.acto.p_honorarios) /
              100 >
            this.actosActores[index].datos.acto.min_honorarios
          )
            actor.honorarios =
              (this.actosActores[index].datos.valor *
                this.actosActores[index].datos.acto.p_honorarios) /
              100;
          else
            actor.honorarios =
              this.actosActores[index].datos.acto.min_honorarios;
        }
      }
      this.actosActores[index].datos.honorarios = actor.honorarios;
    });
  }

  // Calcular iva
  calcularIva(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.iva) {
        actor.hasIva = true;
        actor.iva = (this.actosActores[index].datos.honorarios * 21) / 100;
      }
    });
  }
  // Calcular diligenciamiento
  calcularDiligenciamiento(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.diligenciamiento) {
        actor.hasDiligenciamiento = true;
        if (
          this.actosActores[index].datos.valor <
          this.escribaniaDatosApi[0].min_valor_diligenciamiento
        )
          actor.diligenciamiento =
            this.escribaniaDatosApi[0].min_diligenciamiento;
        else {
          let excedente: number =
            this.actosActores[index].datos.valor -
            this.escribaniaDatosApi[0].min_valor_diligenciamiento;
          actor.diligenciamiento =
            (excedente / 1000) * 2 +
            this.escribaniaDatosApi[0].min_diligenciamiento;
        }
      }
    });
  }
  // Calcular inscripcion
  calcularInscripcion(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      // si le corresponde pagar inscripcion
      if (actor.actor.inscripcion) {
        actor.hasInscripcion = true;
        actor.inscripcion =
          this.actosActores[index].datos.valor * 0.002 +
          this.escribaniaDatosApi[0].gestor;
      }
    });
  }

  // Calcular aportes
  calcularAporte(index: number) {
    let cant = 0;
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.aporte) cant++;
    });
    if (cant != 0) {
      this.actosActores[index].actores.forEach((actor) => {
        var total = 0;
        if (actor.actor.aporte) {
          actor.hasAporte = true;
          // Busca en toda la escala la fila quede entre max y min del honorario
          if (this.actosActores[index].datos.acto.p_aportes < 0) {
            let indiceEscala = this.getEscalaPorcentual(
              this.actosActores[index].datos.honorarios
            );
            let escala = this.escalaPorcentualApi[indiceEscala];
            total = escala.aporte_fijo;
            //si el aporte fijo es igual a cero es la primera
            if (escala.aporte_fijo == 0)
              total =
                (this.actosActores[index].datos.honorarios *
                  escala.porcentaje_excedente) /
                100;
            if (
              this.actosActores[index].datos.honorarios > escala.min &&
              escala.min > 0
            ) {
              let excedente =
                this.actosActores[index].datos.honorarios - escala.min;
              total += (excedente * escala.porcentaje_excedente) / 100;
            }
            if (this.actosActores[index].datos.acto.p_aportes == -2) {
              total = total / 2;
            }
            actor.aporte = total / cant;
          } else {
            //No posee escala porcentual
            if (
              this.actosActores[index].datos.valor *
                this.actosActores[index].datos.acto.p_aportes >=
              this.actosActores[index].datos.acto.min_aportes
            )
              actor.aporte =
                (this.actosActores[index].datos.valor *
                  this.actosActores[index].datos.acto.p_aportes) /
                cant;
            else
              actor.aporte =
                this.actosActores[index].datos.acto.min_aportes / cant;
          }
        }
      });
    }
  }

  getEscalaPorcentual(valorHonorario: number): number {
    for (let i = 0; i < this.escalaPorcentualApi.length; i++) {
      if (
        valorHonorario <= this.escalaPorcentualApi[i].max &&
        valorHonorario > this.escalaPorcentualApi[i].min
      )
        return i;
    }
    return 0;
  }
  // Calcular rcd
  calcularRcd(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.rcd) {
        actor.hasRcd = true;
        if (
          (this.actosActores[index].datos.valor *
            this.escribaniaDatosApi[0].p_rcd) /
            100 >
          this.escribaniaDatosApi[0].min_rcd
        )
          actor.rcd =
            (this.actosActores[index].datos.valor *
              this.escribaniaDatosApi[0].p_rcd) /
            100;
        else actor.rcd = this.escribaniaDatosApi[0].min_rcd;
      }
    });
  }

  // Calcular ganancia
  calcularGanancias(index: number): void {
    if (this.tieneGanancia) {
      this.actosActores[index].actores.forEach((actor) => {
        if (actor.actor.ganancias) {
          actor.ganancias =
            (this.actosActores[index].datos.valor *
              this.actosActores[index].datos.acto.p_ganancias) /
            100;
          actor.hasGanancias = true;
        }
      });
    }
  }

  // Calcular iti
  calcularIti(index: number): void {
    if (this.tieneIti) {
      this.actosActores[index].actores.forEach((actor) => {
        if (actor.actor.iti) {
          actor.iti =
            (this.actosActores[index].datos.valor *
              this.actosActores[index].datos.acto.p_iti) /
            100;
          actor.hasIti = true;
        }
      });
    }
  }
  // Calcular matricula
  calcularMatricula(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      if (actor.actor.matricula) {
        actor.matricula = this.escribaniaDatosApi[0].matricula;
        actor.hasMatricula = true;
      }
    });
  }

  // Actualizar total actores
  calculcarTotalActor(index: number): void {
    this.actosActores[index].actores.forEach((actor) => {
      actor.total =
        actor.sello +
        actor.aporte +
        actor.honorarios +
        actor.iva +
        actor.inscripcion +
        actor.matricula +
        actor.folios +
        actor.certificados +
        actor.municipal +
        actor.diligenciamiento +
        actor.rcd +
        actor.ganancias +
        actor.iti;
    });
  }

  setActosActores() {
    this.actoService.eliminarActosActores();
    this.actosActores = [];
    let arrayControl = this.formCalculador!.get('actosArray') as FormArray;
    for (let i = 0; i < arrayControl.length; i++) {
      var acto: Acto = this.getActoByName(
        String(arrayControl.at(i).value.acto)
      );
      // Set datos
      var dato: Datos = {
        nombreCliente: String(this.formCalculador!.value.nombreCliente),
        acto: acto,
        valor: Number(this.formCalculador.value.valor),
        honorarios: 0,
        total: 0,
      };
      this.listaActos += dato.acto.nombre_acto + ', ';
      // Set Actores
      var actores: Actor[] = this.getActoresByActo(acto.id);
      var actoresEditables: ActorEditable[] = [];
      for (let j = 0; j < actores.length; j++) {
        var actorEditable: ActorEditable = {
          actor: actores[j],
          sello: 0,
          hasSello: false,
          aporte: 0,
          hasAporte: false,
          honorarios: 0,
          hasHonorarios: false,
          iva: 0,
          hasIva: false,
          inscripcion: 0,
          hasInscripcion: false,
          matricula: 0,
          hasMatricula: false,
          folios: 0,
          hasFolios: false,
          certificados: 0,
          hasCertificados: false,
          municipal: 0,
          hasMunicipal: false,
          diligenciamiento: 0,
          hasDiligenciamiento: false,
          rcd: 0,
          hasRcd: false,
          ganancias: 0,
          hasGanancias: false,
          iti: 0,
          hasIti: false,
          total: 0,
        };
        actoresEditables.push(Object.assign({}, actorEditable));
      }
      var actoActores: ActoActores = {
        datos: dato,
        actores: actoresEditables,
      };
      this.actosActores.push(Object.assign({}, actoActores));
    }
  }
  calcular() {
    console.log('hola');

    this.setActosActores();
    this.isShowed = false;
    this.tieneSello = this.formCalculador.value.sellos == true ? true : false;
    this.tieneGanancia =
      this.formCalculador.value.ganancias == true ? true : false;
    this.tieneIti = this.formCalculador.value.iti == true ? true : false;
    this.tieneCoti = this.formCalculador.value.coti == true ? true : false;
    this.tieneItgb = this.formCalculador.value.itgb == true ? true : false;
    this.tieneImpuestoCedular =
      this.formCalculador.value.impuesto_cedular == true ? true : false;
    for (let i = 0; i < this.actosActores.length; i++) {
      this.setCertificados(Number(this.formCalculador.value.certificados), i);
      this.setCertificadosMunicipal(
        Number(this.formCalculador.value.municipal),
        i
      );
      this.setFolios(Number(this.formCalculador.value.folios), i);
      this.calcularMatricula(i);
      this.calcularSello(i);
      this.calcularGanancias(i);
      this.calcularIti(i);
      this.calcularHonorarios(i);
      this.calcularIva(i);
      this.calcularAporte(i);
      this.calcularRcd(i);
      this.calcularInscripcion(i);
      this.calcularDiligenciamiento(i);
      this.calculcarTotalActor(i);
      this.calcularTotal(i);
    }
    this.actoService.actualizarIsShowed(this.isShowed);
    this.actualizarTotal();
    this.actoService.actualizarActosActores(this.actosActores);
    this.isShowed = true;
    this.actoService.actualizarIsShowed(this.isShowed);
  }

  actualizarTotal() {
    let total = 0;
    this.actoService.limpiarTotal();
    this.actosActores.forEach((actoActores) => {
      total += actoActores.datos.total;
    });
    this.actoService.actualizarTotal(total);
  }
  // Sirve para el filtro
  getActoByName(nameActo: String): Acto {
    return this.actosApi.find(
      (a) => a.nombre_acto.toLocaleLowerCase() == nameActo.toLocaleLowerCase()
    )!;
  }

  getActoresByActo(idActo: number): Actor[] {
    var actores: Actor[] = [];
    this.listaActoresApi.forEach((actor) => {
      if (actor.id_acto == idActo) actores.push(actor);
    });
    return actores;
  }

  // Calcular total
  calcularTotal(index: number) {
    this.actosActores[index].actores.forEach((actor) => {
      this.actosActores[index].datos.total += actor.total;
    });
  }
}
