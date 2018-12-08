import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CrudController } from '../generic/crud-controller';
import { Transferencia } from '../../model/transferencia/transferencia';
import { Conta } from '../../model/conta/conta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { TransferenciaService } from '../../services/transferencia/transferencia.service';
import { ResponseApi } from '../../model/response-api';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TransferenciaSaveComponent } from './save/transferencia-save.component';
import {IMyDrpOptions, IMyDateRangeModel} from 'mydaterangepicker';
import { FiltroTransferencia } from '../../model/transferencia/filtro/filtro-transferencia';
import { TransferenciaFixaService } from '../../services/transferencia/transferencia-fixa.service';


@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent extends CrudController<Transferencia, {new(): Transferencia}> implements OnInit {

  listaConta = [];
  tpTransferencia:string;

  listaFixa = [];

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private transferenciaFixaService: TransferenciaFixaService,
              private transferenciaService: TransferenciaService) {
      super(router, Transferencia, toastr, dialogService, transferenciaService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarTransferencia();
  } 

  resetFiltros() {
    this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                      endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
    this.objeto.filtro = new FiltroTransferencia();
    this.objeto.filtro.dtTransferenciaInicio = new Date();
    this.objeto.filtro.dtTransferenciaFim = new Date();
    this.periodo.beginDate.year = new Date().getFullYear();
    this.periodo.beginDate.month = new Date().getMonth() + 1;
    this.periodo.beginDate.day = new Date().getDate();
    
    this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
    //this.objeto.idContaOrigem = 0;
    //this.objeto.idContaDestino = 0;
    this.tpTransferencia = "N";
  }


  pesquisarTransferencia() {
    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.filtro = this.objeto.filtro;
  
    // Transferencia Normal
    this.transferenciaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });

    //Transferencia Fixa
    this.transferenciaFixaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.listaFixa = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.transferenciaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(TransferenciaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarTransferencia();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalAlterarFixa(codigo) {
    if(codigo != undefined) {
      this.transferenciaFixaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  this.objeto.fgTransferenciaFixa = true;
                  console.log(this.objeto);
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(TransferenciaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarTransferencia();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalFixaAlterar(codigo) {
    if(codigo != undefined) {
      this.transferenciaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(TransferenciaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarTransferencia();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalInserir(tipo) {
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.data =  {tipo: tipo};   
    
    this.dialog.open(TransferenciaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarTransferencia();
    });  
  }

  excluirDefinitivamente(id:string){
    this.dialogService.confirm('Tem certeza que deseja excluir definitivamente esta transferência?')
      .then((candelete:boolean) => {
          if(candelete){            
            this.transferenciaService.excluirDefinitivamente(id).subscribe((responseApi:ResponseApi) => {
              this.resetFiltros();
              this.pesquisarTransferencia();
              this.msgSucesso('A transferência foi excluída definitivamente do sistema.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  selecionarPeriodoFiltro(event: IMyDateRangeModel) {
    this.objeto.filtro = new FiltroTransferencia(); 
    this.objeto.filtro.dtTransferenciaInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    this.objeto.filtro.dtTransferenciaFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
    this.pesquisarTransferencia();

    this.tpTransferencia = 'N';
  }

}
