import { HOST_CONTROLME } from '../controlme.api';
import { Injectable, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';


export interface GenericService<Entity> {
    
    inserir(entity: Entity);
    alterar(entity: Entity);
    pesquisar(entity: Entity);

}
