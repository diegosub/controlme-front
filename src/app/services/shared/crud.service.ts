import { HOST_CONTROLME } from '../controlme.api';
import { HttpClient} from '@angular/common/http';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CrudService<Entity> implements GenericService<Entity> {
    
    constructor(public http: HttpClient) {}
    
    get(id: any) {
        alert(this.strArtefato());
        return this.http.get(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}`);
    }
    
    inserir(entity: Entity) {
        return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato(), entity);
    }
    
    alterar(entity: Entity) {
        return this.http.put(`${HOST_CONTROLME}/api/`+this.strArtefato(), entity);
    }

    pesquisar(entity: Entity) {
        return this.http.post(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/pesquisar`, entity);
    }

    ativarInativar(id:string, status:boolean) {
        return this.http.delete(`${HOST_CONTROLME}/api/`+this.strArtefato()+`/${id}/${status}`);
    }

    strArtefato(): string { return null }
}
