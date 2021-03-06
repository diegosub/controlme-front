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
import { Categoria } from '../../../model/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { Observable } from 'rxjs';


declare var $ :any;

@Component({
  selector: 'app-despesa-save',
  templateUrl: './despesa-save.component.html',
  styleUrls: ['./despesa-save.component.css']
})
export class DespesaSaveComponent extends CrudController<Despesa, {new(): Despesa}> implements OnInit {

  listaConta = [];
  listaCategoria = [];
  listaSubcategoria = [];
  maxDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private contaService: ContaService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService,
              private despesaService: DespesaService,
              private dialogRef: MatDialogRef<DespesaSaveComponent>) {
      super(router, Despesa, toastr, dialogService, despesaService);
  }

  ngOnInit() {

    this.pesquisarConta();
    this.pesquisarCategoria();

    this.objeto.idCategoria = 0;
    this.objeto.idSubcategoria = 0;
           
    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;

      if(this.objeto.idSubcategoria == null) { 
        this.objeto.idSubcategoria = 0;
      }

      this.pesquisarSubcategoria();    
      this.objeto.dtDespesa = new Date(this.objeto.dtDespesa);      
    } else {
      this.objeto.dtDespesa = new Date();
    }

  }

  pesquisarConta()  {
    let conta: Conta = new Conta();
    conta.fgAtivo = true;
    conta.idUsuario = this.getCodigoUsuarioLogado();

    this.contaService.listarContas(conta)
                .subscribe((responseApi:ResponseApi) => {
      this.listaConta = responseApi['data'];
      if(this.data == null || this.data.objeto == undefined){
        this.listaConta.forEach(element => {
          if(element.fgPrincipal) {
            this.objeto.idConta = element.idConta;
          }
        });
      }
    } , err => {
      this.tratarErro(err);
    });    
  }

  pesquisarCategoria() {
    let categoria: Categoria = new Categoria();
    categoria.idUsuario = this.getCodigoUsuarioLogado();
    categoria.tpCategoria = 'D';

    this.categoriaService.listarTodasAtivas(categoria)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCategoria = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }

  atualizarSubcategoria() {
    this.pesquisarSubcategoria();
    this.objeto.idSubcategoria = 0;
  }

  pesquisarSubcategoria() {
    let subcategoria: Subcategoria = new Subcategoria();
    subcategoria.idCategoria = this.objeto.idCategoria;
    subcategoria.fgAtivo = true;

    this.subcategoriaService.listarTodasAtivas(subcategoria)
                .subscribe((responseApi:ResponseApi) => {
      this.listaSubcategoria = responseApi['data'];      
    } , err => {
      this.tratarErro(err);
    });
  }

  validarInserir() {

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.idConta == 0 || this.objeto.idConta == null) {
      this.msgErro("O campo Conta é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtDespesa == null) {
      this.msgErro("O campo Data é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.idDespesa == 0 || this.objeto.idDespesa == null) {
      this.msgErro("O campo Código é obrigatório.");
      return false;
    }

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.idConta == 0 || this.objeto.idConta == null) {
      this.msgErro("O campo Conta é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtDespesa == null) {
      this.msgErro("O campo Data é obrigatório.");
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
