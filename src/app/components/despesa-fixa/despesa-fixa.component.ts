

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DespesaFixa } from '../../model/despesa-fixa/despesa-fixa';
import { DespesaFixaService } from '../../services/despesa-fixa/despesa-fixa.service';
import { DialogService } from '../../dialog-service';
import { ResponseApi } from '../../model/response-api';
import { CrudController } from '../generic/crud-controller';
import { DespesaFixaSaveComponent } from './save/despesa-fixa-save.component';
import { DespesaCartaoSaveComponent } from '../despesa-cartao/save/despesa-cartao-save.component';


@Component({
  selector: 'app-despesa-fixa',
  templateUrl: './despesa-fixa.component.html',
  styleUrls: ['./despesa-fixa.component.css']
})
export class DespesaFixaComponent extends CrudController<DespesaFixa, {new(): DespesaFixa}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private despesaFixaService: DespesaFixaService) {
      super(router, DespesaFixa, toastr, dialogService, despesaFixaService);
  }

  ngOnInit() {
    // this.resetFiltros();
    this.pesquisarDespesaFixa();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(DespesaFixaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      //this.resetFiltros();
      this.pesquisarDespesaFixa();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.despesaFixaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(DespesaFixaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    //this.resetFiltros();
                    this.pesquisarDespesaFixa();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  // resetFiltros() {
  //   this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
  //                     endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
  //   this.objeto.filtro = new FiltroDespesa();
  //   this.objeto.filtro.dtDespesaInicio = new Date();
  //   this.objeto.filtro.dtDespesaFim = new Date();
  //   this.periodo.beginDate.year = new Date().getFullYear();
  //   this.periodo.beginDate.month = new Date().getMonth() + 1;
  //   this.periodo.beginDate.day = new Date().getDate();
    
  //   this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
  // }

  pesquisarDespesaFixa() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
 
    this.despesaFixaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }
  
  // selecionarPeriodoFiltro(event: IMyDateRangeModel) {
  //   this.objeto.filtro = new FiltroDespesa(); 
  //   this.objeto.filtro.dtDespesaInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
  //   this.objeto.filtro.dtDespesaFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
  //   this.pesquisarDespesaCartao();
  // }

  executarPosInativar() {
    this.pesquisarDespesaFixa();
  }

}