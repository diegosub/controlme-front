import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Categoria } from '../../model/categoria/categoria';
import { HttpClient} from '@angular/common/http';
import { HOST_CONTROLME } from '../controlme.api';



@Injectable()
export class CategoriaService extends CrudService<Categoria> {
  
  constructor(public http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  pesquisarInativos(categoria: Categoria) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/pesquisarInativos`, categoria);
  }
  
  strArtefato(): string {    
    return "categoria";
  }

}
