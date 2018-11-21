import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Conta } from '../../model/conta/conta';



@Injectable()
export class ContaService extends CrudService<Conta> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  setarPrincipal(id: any) {        
    return this.http.get(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/setarPrincipal/${id}`);
  }

  pesquisarInativos(conta: Conta) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/pesquisarInativos`, conta);
  }

  listarContas(conta: Conta) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/listarContas`, conta);
  }

  strArtefato(): string {    
    return "conta";
  }

}
