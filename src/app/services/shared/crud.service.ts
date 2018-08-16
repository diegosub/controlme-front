import { HOST_CONTROLME } from '../controlme.api';
import { HttpClient} from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Alert } from 'selenium-webdriver';

@Injectable()
export abstract class CrudService<Entity> implements GenericService<Entity> {
    
    constructor(private http: HttpClient) {}
    
    get(entity: Entity) {
        return this.http.get(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/get`, entity);
    }
    
    inserir(entity: Entity) {
        return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato(), entity);
    }
    
    alterar(entity: Entity) {
        return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/alterar`, entity);
    }

    pesquisar(entity: Entity) {
        return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/pesquisar`, entity);
    }

    strArtefato(): string { return null }


}
