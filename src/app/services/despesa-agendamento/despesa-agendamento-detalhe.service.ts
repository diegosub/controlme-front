import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { DespesaAgendamentoDetalhe } from '../../model/despesa-agendamento/despesa-agendamento-detalhe';



@Injectable()
export class DespesaAgendamentoDetalheService extends CrudService<DespesaAgendamentoDetalhe> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "despesaAgendamento";
  }

}
