import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../services/shared/crud.service';
import { ResponseApi } from '../../model/response-api';
import { ToastrService } from 'ngx-toastr';

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

      this.msgSucesso();
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

  preparaInserir() {
    
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

  tratarErro(err) {
    if(err['error']['errors'] != null) {      
      this.toastr.error(err['error']['errors'][0], 'Erro!');
    } else {
      this.toastr.error('Ocorreu um erro insesperado em nosso servidor, favor tentar novamente.', 'Oops!');
    }
  }

  msgSucesso() {
    this.toastr.success('O registro foi cadastrado com sucesso.','Sucesso!');
  }

}
