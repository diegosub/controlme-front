import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { FiltroDespesa } from '../../model/despesa/filtro/filtro-despesa';
import { ResponseApi } from '../../model/response-api';
import { DespesaCartaoService } from '../../services/despesa-cartao/despesa-cartao.service';
import { CrudController } from '../generic/crud-controller';
import { DespesaCartaoSaveComponent } from './save/despesa-cartao-save.component';
import { DespesaCch } from '../../model/despesa-cartao/despesa-cch';


@Component({
  selector: 'app-despesa-cartao',
  templateUrl: './despesa-cartao.component.html',
  styleUrls: ['./despesa-cartao.component.css']
})
export class DespesaCartaoComponent extends CrudController<DespesaCch, {new(): DespesaCch}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private despesaCartaoService: DespesaCartaoService) {
      super(router, DespesaCch, toastr, dialogService, despesaCartaoService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarDespesaCartao();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(DespesaCartaoSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarDespesaCartao();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.despesaCartaoService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(DespesaCartaoSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarDespesaCartao();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
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

  pesquisarDespesaCartao() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
    //this.objeto.filtro = this.objeto.filtro;
 
    this.despesaCartaoService.pesquisar(this.objeto)
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
    
    this.pesquisarDespesaCartao();
  }

  executarPosInativar() {
    this.pesquisarDespesaCartao();
  }

}