import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Cartao } from '../../../model/cartao/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';

@Component({
  selector: 'app-cartao-form',
  templateUrl: './cartao-form.component.html',
  styleUrls: ['./cartao-form.component.css']
})
export class CartaoFormComponent extends CrudController<Cartao, {new(): Cartao}> implements OnInit {

  @ViewChild('dsCategoria') private elementRef: ElementRef;
  tipo: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private cartaoService: CartaoService,
              private dialogRef: MatDialogRef<CartaoFormComponent>) {
      super(router, Cartao, toastr, dialogService, cartaoService);
  }

  ngOnInit() {

  }

  validarInserir() {
    if(this.objeto.nrDiaCorte < 1
                    || this.objeto.nrDiaCorte > 30) {
      this.msgErro("O Dia do Fechamento da Fatura deve estar entre o dia 1 e 30.");
      return false;
    }

    if(this.objeto.nrDiaVencimento < 1
                    || this.objeto.nrDiaVencimento > 30) {
      this.msgErro("O Dia do Vencimento deve estar entre o dia 1 e 30.");
      return false;
    }

    return true;
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
