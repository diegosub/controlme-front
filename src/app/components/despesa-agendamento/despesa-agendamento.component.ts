import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ToastrService } from 'ngx-toastr';
import { FiltroDespesaAgendamentoHeader } from '../../model/despesa-agendamento/filtro/filtro-despesa-agendamento-header';
import { DialogService } from '../../dialog-service';
import { DespesaAgendamentoHeader } from '../../model/despesa-agendamento/despesa-agendamento-header';
import { ResponseApi } from '../../model/response-api';
import { DespesaAgendamentoHeaderService } from '../../services/despesa-agendamento/despesa-agendamento-header.service';
import { CrudController } from '../generic/crud-controller';
import { DespesaAgendamentoSaveComponent } from './save/despesa-agendamento-save.component';


@Component({
  selector: 'app-despesa-agendamento',
  templateUrl: './despesa-agendamento.component.html',
  styleUrls: ['./despesa-agendamento.component.css']
})
export class DespesaAgendamentoComponent extends CrudController<DespesaAgendamentoHeader, {new(): DespesaAgendamentoHeader}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private despesaAgendamentoHeaderService: DespesaAgendamentoHeaderService) {
      super(router, DespesaAgendamentoHeader, toastr, dialogService, despesaAgendamentoHeaderService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarDespesaAgendamento();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(DespesaAgendamentoSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarDespesaAgendamento();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.despesaAgendamentoHeaderService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  console.log(this.objeto);
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(DespesaAgendamentoSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarDespesaAgendamento();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  resetFiltros() {
    this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                      endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
    this.objeto.filtro = new FiltroDespesaAgendamentoHeader();
    this.objeto.filtro.dtInicioInicio = new Date();
    this.objeto.filtro.dtInicioFim = new Date();
    this.periodo.beginDate.year = new Date().getFullYear();
    this.periodo.beginDate.month = new Date().getMonth() + 1;
    this.periodo.beginDate.day = new Date().getDate();
    
    this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
  }

  pesquisarDespesaAgendamento() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
    this.objeto.filtro = this.objeto.filtro;
 
    this.despesaAgendamentoHeaderService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }

  inativarDespesaAgendamento(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este agendamento?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = false;
            this.despesaAgendamentoHeaderService.inativarDespesaAgendamento(id).subscribe((responseApi:ResponseApi) => {              
             
              this.resetFiltros();
              this.pesquisarDespesaAgendamento();

              this.msgSucesso('O agendamento foi inativada com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  selecionarPeriodoFiltro(event: IMyDateRangeModel) {
    this.objeto.filtro = new FiltroDespesaAgendamentoHeader(); 
    this.objeto.filtro.dtInicioInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    this.objeto.filtro.dtInicioFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
    this.pesquisarDespesaAgendamento();
  }

  executarPosInativar() {
    this.pesquisarDespesaAgendamento();
  }

}