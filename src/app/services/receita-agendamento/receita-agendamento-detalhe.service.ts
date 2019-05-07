import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { ReceitaAgendamentoDetalhe } from '../../model/receita-agendamento/receita-agendamento-detalhe';



@Injectable()
export class ReceitaAgendamentoDetalheService extends CrudService<ReceitaAgendamentoDetalhe> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "receitaAgendamento";
  }

}
