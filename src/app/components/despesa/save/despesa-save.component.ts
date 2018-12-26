import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Despesa } from '../../../model/despesa/despesa';
import { DespesaService } from '../../../services/despesa/despesa.service';
import { CrudController } from '../../generic/crud-controller';
import { Conta } from '../../../model/conta/conta';
import { ContaService } from '../../../services/conta/conta.service';
import { ResponseApi } from '../../../model/response-api';


declare var $ :any;

@Component({
  selector: 'app-despesa-save',
  templateUrl: './despesa-save.component.html',
  styleUrls: ['./despesa-save.component.css']
})
export class DespesaSaveComponent extends CrudController<Despesa, {new(): Despesa}> implements OnInit {

  listaConta = [];
  maxDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private contaService: ContaService,
              private despesaService: DespesaService,
              private dialogRef: MatDialogRef<DespesaSaveComponent>) {
      super(router, Despesa, toastr, dialogService, despesaService);
  }

  ngOnInit() {
    this.pesquisarConta();

    this.objeto.idConta = 0;

    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;
      this.objeto.dtDespesa = new Date(this.objeto.dtDespesa);
    } else {
      this.objeto.dtDespesa = new Date();
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

  validarInserir() {

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    return true;
  }

  completarInserir() {
    this.objeto.dtCadastro = new Date();
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
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
