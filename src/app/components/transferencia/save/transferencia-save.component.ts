import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Transferencia } from '../../../model/transferencia/transferencia';
import { Conta } from '../../../model/conta/conta';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { ContaService } from '../../../services/conta/conta.service';
import { TransferenciaService } from '../../../services/transferencia/transferencia.service';
import { ResponseApi } from '../../../model/response-api';
import { MatDialogRef, MatDatepickerModule, MAT_DIALOG_DATA } from '@angular/material';
import { TransferenciaFixaService } from '../../../services/transferencia/transferencia-fixa.service';


declare var $ :any;

@Component({
  selector: 'app-transferencia-save',
  templateUrl: './transferencia-save.component.html',
  styleUrls: ['./transferencia-save.component.css']
})
export class TransferenciaSaveComponent extends CrudController<Transferencia, {new(): Transferencia}> implements OnInit {

  listaConta = [];
  maxDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private contaService: ContaService,
              private transferenciaService: TransferenciaService,
              private transferenciaFixaService: TransferenciaFixaService,
              private dialogRef: MatDialogRef<TransferenciaSaveComponent>) {
      super(router, Transferencia, toastr, dialogService, transferenciaService);
  }

  ngOnInit() {
    this.pesquisarConta();

    this.objeto.idContaOrigem = 0;
    this.objeto.idContaDestino = 0;

    if(this.data.objeto != undefined){
      this.objeto = this.data.objeto;      
    }

  }

  pesquisarConta() {
    let conta: Conta = new Conta();
    conta.fgAtivo = true;
    conta.idUsuario = this.getCodigoUsuarioLogado();

    this.contaService.listarContas(conta)
                .subscribe((responseApi:ResponseApi) => {
      this.listaConta = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });

  }

  inserirTransferencia() {
    if(this.validarInserir()) {
      this.completarInserir();

      this.transferenciaService.inserirTransferencia(this.objeto).subscribe((responseApi:ResponseApi) => {

        this.executarPosInserir();

        this.msgSucesso('A transferência foi cadastrada com sucesso.');
      } , err => {      
        this.tratarErro(err);
      });
    }
  }


  alterarFixa() {
    if(this.validarAlterar()) {
      this.completarAlterar();

      this.transferenciaFixaService.alterar(this.objeto).subscribe((responseApi:ResponseApi) => {

        this.executarPosAlterar();

        this.msgSucesso('A transferência fixa foi alterada com sucesso.');
      } , err => {      
        this.tratarErro(err);
      });
    }
  }

  validarInserir() {

    if(this.objeto.idContaOrigem == 0 || this.objeto.idContaOrigem == null) {
      this.msgErro("O campo Conta de Origem é obrigatório.");
      return false;
    }

    if(this.objeto.idContaDestino == 0 || this.objeto.idContaDestino == null) {
      this.msgErro("O campo Conta de Destino é obrigatório.");
      return false;
    }

    if(this.objeto.idContaDestino == this.objeto.idContaOrigem) {
      this.msgErro("A Conta de Destino não pode ser a mesma Conta de Origem.");
      return false;
    }

    if(this.objeto.vlTransferencia <= 0 || this.objeto.vlTransferencia == null) {
      this.msgErro("O campo Valor da Transferência deve ser maior que zero.");
      return false;
    }

    if(this.objeto.fgTransferenciaFixa) {
      if(this.objeto.nrDia == null || this.objeto.nrDia <= 0 || this.objeto.nrDia > 31) {
        this.msgErro("Se a transferência for fixa, o campo Dia da Transferência deve ser preencido com o valor entre 1 e 31.");
        return false;
      }
    } else {
      if(this.objeto.dtTransferencia == null) {
        this.msgErro("Se a transferência não for fixa, o campo Data da Transferência é obrigatório.");
        return false;
      }
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.fgTransferenciaFixa) {
      if(this.objeto.idTransferenciaFixa == 0 || this.objeto.idTransferenciaFixa == null) {
        this.msgErro("O campo Código da Transferência é obrigatório.");
        return false;
      }
    } else {
      if(this.objeto.idTransferencia == 0 || this.objeto.idTransferencia == null) {
        this.msgErro("O campo Código da Transferência é obrigatório.");
        return false;
      }
    }

    if(this.objeto.idContaOrigem == 0 || this.objeto.idContaOrigem == null) {
      this.msgErro("O campo Conta de Origem é obrigatório.");
      return false;
    }

    if(this.objeto.idContaDestino == 0 || this.objeto.idContaDestino == null) {
      this.msgErro("O campo Conta de Destino é obrigatório.");
      return false;
    }

    if(this.objeto.idContaDestino == this.objeto.idContaOrigem) {
      this.msgErro("A Conta de Destino não pode ser a mesma Conta de Origem.");
      return false;
    }

    if(this.objeto.vlTransferencia <= 0 || this.objeto.vlTransferencia == null) {
      this.msgErro("O campo Valor da Transferência deve ser maior que zero.");
      return false;
    }

    if(this.objeto.fgTransferenciaFixa) {
      if(this.objeto.nrDia == null || this.objeto.nrDia <= 0 || this.objeto.nrDia > 31) {
        this.msgErro("O campo Dia da Transferência deve ser preencido com o valor entre 1 e 31.");
        return false;
      }
    } else {
      if(this.objeto.dtTransferencia == null) {
        this.msgErro("O campo Data da Transferência é obrigatório.");
        return false;
      }
    }

    return true;
  }

  clearResult() {
    this.objeto.dtTransferencia = null;
    this.objeto.nrDia = null;
  }


  completarInserir() {
    this.objeto.dtCadastro = new Date();
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();

    if(this.objeto.fgTransferenciaFixa) {
      this.objeto.fgAtivo = true;
    }
  }

  completarAlterar() {
    this.objeto.dtAlteracao = new Date();
  }

  executarPosInserir() {
    this.fechar();
  }

  executarPosAlterar() {
    this.fechar();
  }

  fechar() {
    this.dialogRef.close();
  }

}
