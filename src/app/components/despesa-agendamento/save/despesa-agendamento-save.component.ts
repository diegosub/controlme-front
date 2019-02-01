import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Categoria } from '../../../model/categoria/categoria';
import { DespesaAgendamentoHeader } from '../../../model/despesa-agendamento/despesa-agendamento-header';
import { Dominio } from '../../../model/dominio/dominio';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DespesaAgendamentoHeaderService } from '../../../services/despesa-agendamento/despesa-agendamento-header.service';
import { DominioService } from '../../../services/dominio/dominio.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';


declare var $ :any;

@Component({
  selector: 'app-despesa-agendamento-save',
  templateUrl: './despesa-agendamento-save.component.html',
  styleUrls: ['./despesa-agendamento-save.component.css']
})
export class DespesaAgendamentoSaveComponent extends CrudController<DespesaAgendamentoHeader, {new(): DespesaAgendamentoHeader}> implements OnInit {

  listaCartao = [];
  listaCategoria = [];
  listaSubcategoria = [];
  listaPeriodo = [];
  maxDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private dominioService: DominioService,
              private cartaoService: CartaoService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService,
              private despesaAgendamentoHeaderService: DespesaAgendamentoHeaderService,
              private dialogRef: MatDialogRef<DespesaAgendamentoSaveComponent>) {
      super(router, DespesaAgendamentoHeader, toastr, dialogService, despesaAgendamentoHeaderService);
  }

  ngOnInit() {

    this.pesquisarCategoria();
    this.pesquisarPeriodo();

    this.objeto.idCategoria = 0;
    this.objeto.idSubcategoria = 0;
    this.objeto.tpDespesaAgh = "P";
    this.objeto.idPeriodo = 3;    //mes
           
    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;

      if(this.objeto.idSubcategoria == null) { 
        this.objeto.idSubcategoria = 0;
      }

      this.pesquisarSubcategoria();    
      this.objeto.dtInicio = new Date(this.objeto.dtInicio);      
    } else {
      this.objeto.dtInicio = new Date();
    }

  }

  pesquisarPeriodo() {
    let dominio: Dominio = new Dominio();
    dominio.dsCampo = 'ID_PERIODO';

    this.dominioService.pesquisarPorCampo(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaPeriodo = responseApi['data']; 
      
      this.listaPeriodo.forEach(element => {
        element.vlDominioNumber = parseInt(element.vlDominio);
      });
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

    console.log(this.objeto);

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }
   
    if(this.objeto.vlDespesaAgh == 0 || this.objeto.vlDespesaAgh == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtInicio == null) {
      this.msgErro("O campo Data é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {


    if(this.objeto.idDespesaAgh == 0 || this.objeto.idDespesaAgh == null) {
      this.msgErro("O campo Código é obrigatório.");
      return false;
    }

    if(this.objeto.idCategoria == 0 || this.objeto.idCategoria == null) {
      this.msgErro("O campo Categoria é obrigatório.");
      return false;
    }

    if(this.objeto.vlDespesaAgh == 0 || this.objeto.vlDespesaAgh == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtInicio == null) {
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
