import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Cartao } from '../../../model/cartao/cartao';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { ResponseApi } from '../../../model/response-api';
import { Conta } from '../../../model/conta/conta';
import { ContaService } from '../../../services/conta/conta.service';


@Component({
  selector: 'app-conta-intv',
  templateUrl: './conta-intv.component.html',
  styleUrls: ['./conta-intv.component.css']
})
export class ContaIntvComponent extends CrudController<Conta, {new(): Conta}> implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private contaService: ContaService,
              private dialogRef: MatDialogRef<ContaIntvComponent>) {
      super(router, Conta, toastr, dialogService, contaService);
  }

  ngOnInit() {
    this.pesquisarInativos();
  }

  pesquisarInativos() {
    this.objeto.fgAtivo = false;
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.contaService.pesquisarInativos(this.objeto)
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
