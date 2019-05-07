import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Categoria } from '../../../model/categoria/categoria';
import { Dominio } from '../../../model/dominio/dominio';
import { ReceitaAgendamentoHeader } from '../../../model/receita-agendamento/receita-agendamento-header';
import { ResponseApi } from '../../../model/response-api';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DominioService } from '../../../services/dominio/dominio.service';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { CrudController } from '../../generic/crud-controller';
import { ReceitaAgendamentoHeaderService } from '../../../services/receita-agendamento/receita-agendamento-header.service';


declare var $ :any;

@Component({
  selector: 'app-receita-agendamento-save',
  templateUrl: './receita-agendamento-save.component.html',
  styleUrls: ['./receita-agendamento-save.component.css']
})
export class ReceitaAgendamentoSaveComponent extends CrudController<ReceitaAgendamentoHeader, {new(): ReceitaAgendamentoHeader}> implements OnInit {

  listaCartao = [];
  listaCategoria = [];
  listaSubcategoria = [];
  listaPeriodo = [];
  minDate; 

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private dominioService: DominioService,
              private cartaoService: CartaoService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService,
              private receitaAgendamentoHeaderService: ReceitaAgendamentoHeaderService,
              private dialogRef: MatDialogRef<ReceitaAgendamentoSaveComponent>) {
      super(router, ReceitaAgendamentoHeader, toastr, dialogService, receitaAgendamentoHeaderService);
  }

  ngOnInit() {

    let data = new Date();
    data.setDate(data.getDate() + 1);
    this.minDate = data;

    this.pesquisarCategoria();
    this.pesquisarPeriodo();

    this.objeto.idCategoria = 0;
    this.objeto.idSubcategoria = 0;
    this.objeto.nrParcelas = 1;
    this.objeto.idPeriodoAgh = 3;    //mes
           
    if(this.data != null && this.data.objeto != undefined){
      this.objeto = this.data.objeto;

      if(this.objeto.idSubcategoria == null) { 
        this.objeto.idSubcategoria = 0;
      }

      this.pesquisarSubcategoria();    
      this.objeto.dtInicio = new Date(this.objeto.dtInicio);      
    } else {
      this.objeto.dtInicio = data;
    }

  }

  pesquisarPeriodo() {
    let dominio: Dominio = new Dominio();
    dominio.dsCampo = 'ID_PERIODO_AGH';

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
   
    if(this.objeto.vlReceitaAgh == 0 || this.objeto.vlReceitaAgh == null) {
      this.msgErro("O campo Valor é obrigatório.");
      return false;
    }

    if(this.objeto.dtInicio == null) {
      this.msgErro("O campo Data é obrigatório.");
      return false;
    }

    if(this.objeto.nrParcelas == null || this.objeto.nrParcelas <= 0) {
      this.msgErro("O campo Nº de Parcelas é obrigatório.");
      return false;
    }

    return true;
  }

  validarAlterar() {


    if(this.objeto.idReceitaAgh == 0 || this.objeto.idReceitaAgh == null) {
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
    this.objeto.idPeriodoAgh = (this.objeto.nrParcelas <= 1) ? null : this.objeto.idPeriodoAgh;
  }

  completarAlterar() {
    this.objeto.dtAlteracao = new Date();
    this.objeto.idPeriodoAgh = (this.objeto.nrParcelas <= 1) ? null : this.objeto.idPeriodoAgh;
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
