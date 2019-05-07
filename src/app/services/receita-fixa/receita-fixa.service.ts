import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReceitaFixa } from '../../model/receita-fixa/receita-fixa';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class ReceitaFixaService extends CrudService<ReceitaFixa> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "receitaFixa";
  }

}
