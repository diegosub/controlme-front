import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { ReceitaAgendamentoHeader } from '../../model/receita-agendamento/receita-agendamento-header';
import { ResponseApi } from '../../model/response-api';
import { ReceitaAgendamentoHeaderService } from '../../services/receita-agendamento/receita-agendamento-header.service';
import { CrudController } from '../generic/crud-controller';
import { ReceitaAgendamentoSaveComponent } from './save/receita-agendamento-save.component';
import { FiltroReceitaAgendamentoHeader } from '../../model/receita-agendamento/filtro/filtro-receita-agendamento-header';


@Component({
  selector: 'app-receita-agendamento',
  templateUrl: './receita-agendamento.component.html',
  styleUrls: ['./receita-agendamento.component.css']
})
export class ReceitaAgendamentoComponent extends CrudController<ReceitaAgendamentoHeader, {new(): ReceitaAgendamentoHeader}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private receitaAgendamentoHeaderService: ReceitaAgendamentoHeaderService) {
      super(router, ReceitaAgendamentoHeader, toastr, dialogService, receitaAgendamentoHeaderService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarReceitaAgendamento();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(ReceitaAgendamentoSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarReceitaAgendamento();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.receitaAgendamentoHeaderService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  console.log(this.objeto);
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(ReceitaAgendamentoSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarReceitaAgendamento();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  resetFiltros() {
    this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                      endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
    this.objeto.filtro = new FiltroReceitaAgendamentoHeader();
    this.objeto.filtro.dtInicioInicio = new Date();
    this.objeto.filtro.dtInicioFim = new Date();
    this.periodo.beginDate.year = new Date().getFullYear();
    this.periodo.beginDate.month = new Date().getMonth() + 1;
    this.periodo.beginDate.day = new Date().getDate();
    
    this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
  }

  pesquisarReceitaAgendamento() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
    this.objeto.filtro = this.objeto.filtro;
 
    this.receitaAgendamentoHeaderService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }

  inativarReceitaAgendamento(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este agendamento?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = false;
            this.receitaAgendamentoHeaderService.inativarReceitaAgendamento(id).subscribe((responseApi:ResponseApi) => {              
             
              this.resetFiltros();
              this.pesquisarReceitaAgendamento();

              this.msgSucesso('O agendamento foi inativada com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  selecionarPeriodoFiltro(event: IMyDateRangeModel) {
    this.objeto.filtro = new FiltroReceitaAgendamentoHeader(); 
    this.objeto.filtro.dtInicioInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    this.objeto.filtro.dtInicioFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
    this.pesquisarReceitaAgendamento();
  }

  executarPosInativar() {
    this.pesquisarReceitaAgendamento();
  }

}