import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Cartao } from '../../../model/cartao/cartao';
import { Categoria } from '../../../model/categoria/categoria';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DespesaCartaoService } from '../../../services/despesa-cartao/despesa-cartao.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';
import { DespesaCch } from '../../../model/despesa-cartao/despesa-cch';


declare var $ :any;

@Component({
  selector: 'app-despesa-cartao-save',
  templateUrl: './despesa-cartao-save.component.html',
  styleUrls: ['./despesa-cartao-save.component.css']
})
export class DespesaCartaoSaveComponent extends CrudController<DespesaCch, {new(): DespesaCch}> implements OnInit {

  listaCartao = [];
  listaCategoria = [];
  listaSubcategoria = [];
  maxDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private cartaoService: CartaoService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService,
              private despesaCartaoService: DespesaCartaoService,
              private dialogRef: MatDialogRef<DespesaCartaoSaveComponent>) {
      super(router, DespesaCch, toastr, dialogService, despesaCartaoService);
  }

  ngOnInit() {

    this.pesquisarCartao();
    this.pesquisarCategoria();

    this.objeto.idCategoria = 0;
    this.objeto.idCartao = 0;
    this.objeto.idSubcategoria = 0;
    this.objeto.nrParcelas = 1;
           
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

  pesquisarCartao()  {
    let cartao: Cartao = new Cartao();
    cartao.fgAtivo = true;
    cartao.idUsuario = this.getCodigoUsuarioLogado();

    this.cartaoService.listarCartoes(cartao)
                .subscribe((responseApi:ResponseApi) => {
      this.listaCartao = responseApi['data'];
      if(this.data == null || this.data.objeto == undefined){
        this.listaCartao.forEach(element => {
          if(element.fgPrincipal) {
            this.objeto.idCartao = element.idCartao;
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

    if(this.objeto.idCartao == 0 || this.objeto.idCartao == null) {
      this.msgErro("O campo Cartão é obrigatório.");
      return false;
    }

    if(this.objeto.dtDespesa == null) {
      this.msgErro("O campo Data da Compra é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.nrParcelas == null || this.objeto.nrParcelas <= 0) {
      this.msgErro("O campo Nº de Parcelas é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {


    if(this.objeto.idDespesaCch == 0 || this.objeto.idDespesaCch == null) {
      this.msgErro("O campo Código é obrigatório.");
      return false;
    }

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.idCartao == 0 || this.objeto.idCartao == null) {
      this.msgErro("O campo Conta é obrigatório.");
      return false;
    }

    if(this.objeto.dtDespesa == null) {
      this.msgErro("O campo Data da Compra é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.nrParcelas == null || this.objeto.nrParcelas <= 0) {
      this.msgErro("O campo Nº de Parcelas é obrigatório.");
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

    console.log(this.objeto);
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
