import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Categoria } from '../../model/categoria/categoria';
import { HttpClient} from '@angular/common/http';



@Injectable()
export class CategoriaService extends CrudService<Categoria> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "categoria";
  }

}
