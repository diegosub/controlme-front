import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Transferencia } from '../../model/transferencia/transferencia';



@Injectable()
export class TransferenciaFixaService extends CrudService<Transferencia> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "transferenciaFixa";
  }

}
