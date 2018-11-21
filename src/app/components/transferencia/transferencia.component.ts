import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CrudController } from '../generic/crud-controller';
import { Transferencia } from '../../model/transferencia/transferencia';
import { Conta } from '../../model/conta/conta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { ContaService } from '../../services/conta/conta.service';
import { TransferenciaService } from '../../services/transferencia/transferencia.service';
import { ResponseApi } from '../../model/response-api';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TransferenciaSaveComponent } from './save/transferencia-save.component';


@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent extends CrudController<Transferencia, {new(): Transferencia}> implements OnInit {

  listaConta = [];

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private contaService: ContaService,
              private transferenciaService: TransferenciaService) {
      super(router, Transferencia, toastr, dialogService, transferenciaService);
  }

  ngOnInit() {
    this.pesquisarTransferencia();

    this.objeto.idContaOrigem = 0;
    this.objeto.idContaDestino = 0;
  }

  pesquisarTransferencia() {
    let transferencia: Transferencia = new Transferencia();
    transferencia.fgAtivo = true;
    transferencia.idUsuario = this.getCodigoUsuarioLogado();

    this.transferenciaService.pesquisar(transferencia)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });

  }

  abrirModalInserir(tipo) {
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.data =  {tipo: tipo};   
    
    this.dialog.open(TransferenciaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
    
      //popular lista de transferencias

    });  
  }

}
