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
    

    if(this.data.objeto != undefined){
      this.objeto = this.data.objeto;      
    }

    alert('oi');

    this.objeto.dtCadastro = new Date();
    alert(this.objeto.dtCadastro);
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
