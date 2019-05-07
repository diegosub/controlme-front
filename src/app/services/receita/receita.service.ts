import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Receita } from '../../model/receita/receita';



@Injectable()
export class ReceitaService extends CrudService<Receita> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  inativarReceita(id:string) {
    return this.http.delete(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}`);
  }

  strArtefato(): string {    
    return "receita";
  }

}
