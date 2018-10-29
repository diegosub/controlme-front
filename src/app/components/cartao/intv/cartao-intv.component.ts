import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Cartao } from '../../../model/cartao/cartao';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { DialogService } from '../../../dialog-service';
import { ResponseApi } from '../../../model/response-api';


@Component({
  selector: 'app-cartao-intv',
  templateUrl: './cartao-intv.component.html',
  styleUrls: ['./cartao-intv.component.css']
})
export class CartaoIntvComponent extends CrudController<Cartao, {new(): Cartao}> implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private cartaoService: CartaoService,
              private dialogRef: MatDialogRef<CartaoIntvComponent>) {
      super(router, Cartao, toastr, dialogService, cartaoService);
  }

  ngOnInit() {
    this.pesquisarInativos();
  }

  pesquisarInativos() {
    this.objeto.fgAtivo = false;
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.cartaoService.pesquisarInativos(this.objeto)
              .subscribe((responseApi:ResponseApi) => {
      
                this.lista = responseApi['data'];                   
    } , err => {
      this.tratarErro(err);
    });
  }

  executarPosAtivar() {
    //this.fechar();
    this.pesquisarInativos();
  }

  fechar() {
    this.dialogRef.close();
  }

}
