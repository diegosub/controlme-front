import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Conta } from '../../../model/conta/conta';
import { ContaService } from '../../../services/conta/conta.service';
import { Dominio } from '../../../model/dominio/dominio';
import { ResponseApi } from '../../../model/response-api';
import { DominioService } from '../../../services/dominio/dominio.service';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html',
  styleUrls: ['./conta-form.component.css']
})
export class ContaFormComponent extends CrudController<Conta, {new(): Conta}> implements OnInit {

  tipo: string;
  listaTipoConta = [];

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private contaService: ContaService,
              private dominioService: DominioService,
              private dialogRef: MatDialogRef<ContaFormComponent>) {
      super(router, Conta, toastr, dialogService, contaService);
  }

  ngOnInit() {

    this.pesquisarTipoConta();

    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;
    } else {
      this.objeto.idTipoConta = 0;
    }

    alert(this.objeto.idTipoConta)
  }

  validarInserir() {
    if(this.objeto.idTipoConta <= 0) {
      this.msgErro("O campo Tipo de Conta é obrigatório.");
      return false;
    }

    return true;
  }

  pesquisarTipoConta() {
    let dominio: Dominio = new Dominio();
    dominio.dsCampo = 'ID_TIPO_CONTA';

    this.dominioService.pesquisarPorCampo(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaTipoConta = responseApi['data']; 
      
      this.listaTipoConta.forEach(element => {
        element.vlDominioNumber = parseInt(element.vlDominio);
      });
    } , err => {
      this.tratarErro(err);
    });
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
