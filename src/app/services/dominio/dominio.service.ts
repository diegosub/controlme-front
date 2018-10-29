import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient} from '@angular/common/http';
import { Dominio } from '../../model/dominio/dominio';



@Injectable()
export class DominioService {

    constructor(public http: HttpClient) {}
  
    pesquisarPorCampo(dominio: Dominio) {
        return this.http.post(`${HOST_CONTROLME}/api/dominio/pesquisarPorCampo`, dominio);
    }

}
