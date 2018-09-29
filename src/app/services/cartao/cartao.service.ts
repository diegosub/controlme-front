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

  strArtefato(): string {    
    return "cartao";
  }

}
