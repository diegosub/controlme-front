import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Transferencia } from '../../model/transferencia/transferencia';



@Injectable()
export class TransferenciaService extends CrudService<Transferencia> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  inserirTransferencia(transferencia: Transferencia) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/inserirTransferencia`, transferencia);
  }

  strArtefato(): string {    
    return "transferencia";
  }

}
