import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DespesaFixa } from '../../model/despesa-fixa/despesa-fixa';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class DespesaFixaService extends CrudService<DespesaFixa> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "despesaFixa";
  }

}
