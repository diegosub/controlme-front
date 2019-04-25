import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST_CONTROLME } from '../controlme.api';
import { CrudService } from '../shared/crud.service';
import { DespesaCch } from '../../model/despesa-cartao/despesa-cch';



@Injectable()
export class DespesaCartaoService extends CrudService<DespesaCch> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  inativarDespesaCartao(id:string) {
    return this.http.delete(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}`);
  }

  strArtefato(): string {    
    return "despesaCartao";
  }

}
