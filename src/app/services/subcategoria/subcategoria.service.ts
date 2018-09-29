import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Categoria } from '../../model/categoria/categoria';
import { HttpClient} from '@angular/common/http';
import { Subcategoria } from '../../model/subcategoria/subcategoria';



@Injectable()
export class SubcategoriaService extends CrudService<Subcategoria> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "subcategoria";
  }

}
