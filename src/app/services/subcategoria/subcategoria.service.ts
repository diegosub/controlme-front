import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategoria } from '../../model/subcategoria/subcategoria';
import { HOST_CONTROLME } from '../controlme.api';
import { CrudService } from '../shared/crud.service';



@Injectable()
export class SubcategoriaService extends CrudService<Subcategoria> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  listarTodasAtivas(subcategoria: Subcategoria) {
    return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/listarTodasAtivas`, subcategoria);
  }

  strArtefato(): string {    
    return "subcategoria";
  }

}
