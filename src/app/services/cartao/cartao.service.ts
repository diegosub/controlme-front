import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Cartao } from '../../model/cartao/cartao';



@Injectable()
export class CartaoService extends CrudService<Cartao> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  setarPrincipal(id: any) {        
    return this.http.get(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/setarPrincipal/${id}`);
  }

  pesquisarInativos(cartao: Cartao) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/pesquisarInativos`, cartao);
  }

  listarCartoes(cartao: Cartao) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/listarCartoes`, cartao);
  }

  strArtefato(): string {    
    return "cartao";
  }

}
