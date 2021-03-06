import { OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from '../../services/shared/crud.service';
import { ResponseApi } from '../../model/response-api';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { IMyDrpOptions } from 'mydaterangepicker';

export class CrudController<Entity, CT extends { new(item?: any): Entity }> implements OnInit {

  objeto: Entity;

  message : {};
  classCss : {};

  lista = [];
  pager: any = {};
  pagedItems: any[];
  linha: string;
  
  constructor(public router: Router,
              private type: CT,                          
              public toastr: ToastrService,
              public dialogService: DialogService,
              private service: CrudService<Entity>) {                
    this.objeto = this.getInstance();
  }

  ngOnInit(){}
  
  getInstance() : Entity {    
    return new this.type();
  }

  inserir() {

    if(this.validarInserir()) {
      this.completarInserir();

      this.service.inserir(this.objeto).subscribe((responseApi:ResponseApi) => {

        this.executarPosInserir();

        this.msgSucesso('O registro foi cadastrado com sucesso.');
      } , err => {      
        this.tratarErro(err);
      });
    }
  }

  alterar() {
    if(this.validarAlterar()) {
      this.completarAlterar();

      this.service.alterar(this.objeto).subscribe((responseApi:ResponseApi) => {

        this.executarPosAlterar();

        this.msgSucesso('O registro foi alterado com sucesso.');
      } , err => {      
        this.tratarErro(err);
      });
    }
  }

  pesquisar() {
    this.completarPesquisar();
    this.service.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
      //if(this.lista.length > 0) {
      //  this.setPage(1);
      //}else{
      //  this.pagedItems = [];
      //}
      //this.spinnerService.hide();
    } , err => {
      this.tratarErro(err);
    });
  }

  get(id) {
    this.service.get(id)
                .subscribe((responseApi:ResponseApi) => {
      this.objeto = responseApi['data'];
      //if(this.lista.length > 0) {
      //  this.setPage(1);
      //}else{
      //  this.pagedItems = [];
      //}
      //this.spinnerService.hide();
    } , err => {
      this.tratarErro(err);
    });
  }

  preparaInserir() {}

  inativar(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = false;
            this.service.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {              
             
              this.executarPosInativar();

              this.msgSucesso('O registro foi inativado com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  ativar(id:string){
    this.dialogService.confirm('Tem certeza que deseja ativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = true;
            this.service.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {              
             
              this.executarPosAtivar();

              this.msgSucesso('O registro foi ativado com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'col-md-2' : true,
      'control-label' : true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  public validarInserir():boolean{return true}
  public validarAlterar():boolean{return true}
  completarInserir(){}
  executarPosInserir(){}  
  completarAlterar(){}
  completarPesquisar(){}
  executarPosAlterar(){}
  executarPosInativar(){}
  executarPosAtivar(){}

  tratarErro(err) {
    if (err.status != 401) {
      if(err['error']['errors'] != null) {      
        this.toastr.error(err['error']['errors'][0], 'Erro!');
      } else {
        this.toastr.error('Ocorreu um erro insesperado em nosso servidor, favor tentar novamente.', 'Oops!');
      }
    }
  }

  getCodigoUsuarioLogado()
  {
    return this.getUsuarioLogado().idUsuario;
  }

  getUsuarioLogado()
  {
    return JSON.parse(localStorage.getItem("cmUsr"));
  }

  msgSucesso(msg) {
    this.toastr.success(msg);
  }

  msgErro(msg) {
    this.toastr.error(msg);
  }

  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
    firstDayOfWeek: 'su',
    height: '32px',
    editableDateRangeField: false,
    openSelectorOnInputClick: true,
    showClearBtn: false,
    showClearDateRangeBtn: false,
    markCurrentDay: true,
    markCurrentYear: true,
    markCurrentMonth: true,
    monthSelector: true,
    minYear: 2018,
    dayLabels: {su: 'Dom', mo: 'Seg', tu: 'Ter', we: 'Qua', th: 'Qui', fr: 'Sex', sa: 'Sab'},
    monthLabels: { 1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez' }
};

}
