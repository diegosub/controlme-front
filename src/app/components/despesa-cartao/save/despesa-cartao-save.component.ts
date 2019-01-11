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
import { DespesaCartao } from '../../../model/despesa-cartao/despesa-cartao';
import { DespesaCartaoService } from '../../../services/despesa-cartao/despesa-cartao.service';
import { Cartao } from '../../../model/cartao/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';


declare var $ :any;

@Component({
  selector: 'app-despesa-cartao-save',
  templateUrl: './despesa-cartao-save.component.html',
  styleUrls: ['./despesa-cartao-save.component.css']
})
export class DespesaCartaoSaveComponent extends CrudController<DespesaCartao, {new(): DespesaCartao}> implements OnInit {

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
      super(router, DespesaCartao, toastr, dialogService, despesaCartaoService);
  }

  ngOnInit() {

    this.pesquisarCartao();
    this.pesquisarCategoria();

    this.objeto.idCategoria = 0;
    this.objeto.idCartao = 0;
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


    if(this.objeto.idDespesaCartao == 0 || this.objeto.idDespesaCartao == null) {
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
