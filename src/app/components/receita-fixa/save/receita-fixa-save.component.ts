import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Categoria } from '../../../model/categoria/categoria';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ContaService } from '../../../services/conta/conta.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';
import { ReceitaFixaService } from '../../../services/receita-fixa/receita-fixa.service';
import { ReceitaFixa } from '../../../model/receita-fixa/receita-fixa';


declare var $ :any;

@Component({
  selector: 'app-receita-fixa-save',
  templateUrl: './receita-fixa-save.component.html',
  styleUrls: ['./receita-fixa-save.component.css']
})
export class ReceitaFixaSaveComponent extends CrudController<ReceitaFixa, {new(): ReceitaFixa}> implements OnInit {

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
              private receitaFixaService: ReceitaFixaService,
              private dialogRef: MatDialogRef<ReceitaFixaSaveComponent>) {
      super(router, ReceitaFixa, toastr, dialogService, receitaFixaService);
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
    categoria.tpCategoria = 'R';

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

    if(this.objeto.dsReceitaFixa == '' || this.objeto.dsReceitaFixa == null) {
      this.msgErro("O campo Descrição é obrigatório.");
      return false;
    }

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.vlReceita == 0 || this.objeto.vlReceita == null) {
      this.msgErro("O campo Valor Base é obrigatório.");
      return false;
    }

    if(this.objeto.nrDiaReceita == null) {
      this.msgErro("O campo Dia da Receita é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.idReceitaFixa == 0 || this.objeto.idReceitaFixa == null) {
      this.msgErro("O campo Código é obrigatório.");
      return false;
    }

    this.validarInserir();

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
