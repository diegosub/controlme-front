import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST_CONTROLME } from '../controlme.api';
import { CrudService } from '../shared/crud.service';
import { ReceitaAgendamentoHeader } from '../../model/receita-agendamento/receita-agendamento-header';



@Injectable()
export class ReceitaAgendamentoHeaderService extends CrudService<ReceitaAgendamentoHeader> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  inativarReceitaAgendamento(id:string) {
    return this.http.delete(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}`);
  }

  strArtefato(): string {    
    return "receitaAgendamento";
  }

}
