import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST_CONTROLME } from '../controlme.api';
import { CrudService } from '../shared/crud.service';
import { DespesaAgendamentoHeader } from '../../model/despesa-agendamento/despesa-agendamento-header';



@Injectable()
export class DespesaAgendamentoHeaderService extends CrudService<DespesaAgendamentoHeader> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  inativarDespesaAgendamento(id:string) {
    return this.http.delete(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}`);
  }

  strArtefato(): string {    
    return "despesaAgendamento";
  }

}
