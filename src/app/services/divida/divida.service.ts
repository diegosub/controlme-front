import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Divida } from '../../model/divida/divida';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class DividaService extends CrudService<Divida> {
  
  constructor(http: HttpClient){
    super(http);
    this.strArtefato();    
  }

  strArtefato(): string {    
    return "divida";
  }

}