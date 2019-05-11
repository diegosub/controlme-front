import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Categoria } from '../../../model/categoria/categoria';
import { DespesaFixa } from '../../../model/despesa-fixa/despesa-fixa';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ContaService } from '../../../services/conta/conta.service';
import { DespesaFixaService } from '../../../services/despesa-fixa/despesa-fixa.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';


declare var $ :any;

@Component({
  selector: 'app-despesa-fixa-save',
  templateUrl: './despesa-fixa-save.component.html',
  styleUrls: ['./despesa-fixa-save.component.css']
})
export class DespesaFixaSaveComponent extends CrudController<DespesaFixa, {new(): DespesaFixa}> implements OnInit {

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
              private despesaService: DespesaFixaService,
              private dialogRef: MatDialogRef<DespesaFixaSaveComponent>) {
      super(router, DespesaFixa, toastr, dialogService, despesaService);
  }

  ngOnInit() {

    this.pesquisarCategoria();

    this.objeto.idCategoria = 0;
    this.objeto.idSubcategoria = 0;
           
    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;

      if(this.objeto.idSubcategoria == null) { 
        this.objeto.idSubcategoria = 0;
      }

      this.pesquisarSubcategoria();    
    }

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

    if(this.objeto.dsDespesaFixa == '' || this.objeto.dsDespesaFixa == null) {
      this.msgErro("O campo Descrição é obrigatório.");
      return false;
    }

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesa == 0 || this.objeto.vlDespesa == null) {
      this.msgErro("O campo Valor Base é obrigatório.");
      return false;
    }

    if(this.objeto.nrDiaVencimento == null) {
      this.msgErro("O campo Dia do Vencimento é obrigatório.");
      return false;
    }

    if(this.objeto.nrDiaVencimento < 1 || this.objeto.nrDiaVencimento > 31) {
      this.msgErro("O campo Dia do Vencimento é deve ser informado no intervalo entre 1 e 31.");
      return false;
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.idDespesaFixa == 0 || this.objeto.idDespesaFixa == null) {
      this.msgErro("O campo Código é obrigatório.");
      return false;
    }

    return this.validarInserir();
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
