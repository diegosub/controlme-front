import { OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../services/shared/crud.service';
import { ResponseApi } from '../../model/response-api';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';

export class CrudController<Entity, CT extends { new(item?: any): Entity }> implements OnInit {

  objeto: Entity;

  message : {};
  classCss : {};

  lista = [];
  pager: any = {};
  pagedItems: any[];
  
  constructor(public router: Router,
              private type: CT,                          
              public toastr: ToastrService,
              private dialogService: DialogService,
              private service: CrudService<Entity>) {                
    this.objeto = this.getInstance();
  }

  ngOnInit(){}
  
  getInstance() : Entity {    
    return new this.type();
  }

  inserir() {
    this.completarInserir();

    this.service.inserir(this.objeto).subscribe((responseApi:ResponseApi) => {

      this.executarPosInserir();

      this.msgSucesso('O registro foi cadastrado com sucesso.');
    } , err => {      
      this.tratarErro(err);
    });
  }

  alterar() {
    this.completarAlterar();

    this.service.alterar(this.objeto).subscribe((responseApi:ResponseApi) => {

      this.executarPosAlterar();

      this.msgSucesso('O registro foi alterado com sucesso.');
    } , err => {      
      this.tratarErro(err);
    });
  }

  pesquisar() {
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
              this.lista.forEach(function (value) {
                if(value.idCategoria == id) {
                  value.fgAtivo = false;
                }
              });

              this.executarPosInativar();

              this.msgSucesso('O registro foi inativado com sucesso.');             
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

  logout() {
    localStorage.removeItem("cmUsr");
    localStorage.removeItem("cmTkn");
    this.router.navigate(['/login']);
  }

  completarInserir(){}
  executarPosInserir(){}  
  completarAlterar(){}
  executarPosAlterar(){}
  executarPosInativar(){}

  tratarErro(err) {
    if (err.status != 401) {
      if(err['error']['errors'] != null) {      
        this.toastr.error(err['error']['errors'][0], 'Erro!');
      } else {
        this.toastr.error('Ocorreu um erro insesperado em nosso servidor, favor tentar novamente.', 'Oops!');
      }
    }
  }

  msgSucesso(msg) {
    this.toastr.success(msg);
  }

}
