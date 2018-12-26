import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Despesa } from '../../model/despesa/despesa';



@Injectable()
export class DespesaService extends CrudService<Despesa> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "despesa";
  }

}
