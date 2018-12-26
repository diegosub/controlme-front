import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { Despesa } from '../../model/despesa/despesa';
import { ResponseApi } from '../../model/response-api';
import { FiltroTransferencia } from '../../model/transferencia/filtro/filtro-transferencia';
import { DespesaService } from '../../services/despesa/despesa.service';
import { CrudController } from '../generic/crud-controller';
import { FiltroDespesa } from '../../model/despesa/filtro/filtro-despesa';
import { DespesaSaveComponent } from './save/despesa-save.component';


@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.css']
})
export class DespesaComponent extends CrudController<Despesa, {new(): Despesa}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private despesaService: DespesaService) {
      super(router, Despesa, toastr, dialogService, despesaService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarDespesa();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(DespesaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarDespesa();
    });  
  }

  resetFiltros() {
    this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                      endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
    this.objeto.filtro = new FiltroDespesa();
    this.objeto.filtro.dtDespesaInicio = new Date();
    this.objeto.filtro.dtDespesaFim = new Date();
    this.periodo.beginDate.year = new Date().getFullYear();
    this.periodo.beginDate.month = new Date().getMonth() + 1;
    this.periodo.beginDate.day = new Date().getDate();
    
    this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
  }

  pesquisarDespesa() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
    this.objeto.filtro = this.objeto.filtro;
 
    this.despesaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }
  
  selecionarPeriodoFiltro(event: IMyDateRangeModel) {
    this.objeto.filtro = new FiltroDespesa(); 
    this.objeto.filtro.dtDespesaInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    this.objeto.filtro.dtDespesaFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
    this.pesquisarDespesa();
  }

}
