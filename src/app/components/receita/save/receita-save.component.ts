import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Categoria } from '../../../model/categoria/categoria';
import { Conta } from '../../../model/conta/conta';
import { Receita } from '../../../model/receita/receita';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { ContaService } from '../../../services/conta/conta.service';
import { ReceitaService } from '../../../services/receita/receita.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';


declare var $ :any;

@Component({
  selector: 'app-receita-save',
  templateUrl: './receita-save.component.html',
  styleUrls: ['./receita-save.component.css']
})
export class ReceitaSaveComponent extends CrudController<Receita, {new(): Receita}> implements OnInit {

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
              private receitaService: ReceitaService,
              private dialogRef: MatDialogRef<ReceitaSaveComponent>) {
      super(router, Receita, toastr, dialogService, receitaService);
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
      this.objeto.dtReceita = new Date(this.objeto.dtReceita);      
    } else {
      this.objeto.dtReceita = new Date();
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

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.idConta == 0 || this.objeto.idConta == null) {
      this.msgErro("O campo Conta é obrigatório.");
      return false;
    }

    if(this.objeto.vlReceita == 0 || this.objeto.vlReceita == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtReceita == null) {
      this.msgErro("O campo Data é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {

    if(this.objeto.idReceita == 0 || this.objeto.idReceita == null) {
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

    if(this.objeto.vlReceita == 0 || this.objeto.vlReceita == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtReceita == null) {
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
