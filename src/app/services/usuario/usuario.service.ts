import { HOST_CONTROLME } from './../controlme.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';


@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    return this.http.post(`${HOST_CONTROLME}/api/auth/login`, usuario);
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${HOST_CONTROLME}/api/auth/registrar`, usuario);
  }

  createOrUpdate(usuario: Usuario){
    if(usuario.idUsuario != null && usuario.idUsuario > 0){
      return this.http.put(`${HOST_CONTROLME}/api/usuario`, usuario);
    } else {
      usuario.idUsuario = null;
      return this.http.post(`${HOST_CONTROLME}/api/usuario`, usuario);
    }
  }

  findAll(page: number, count: number){
    return this.http.get(`${HOST_CONTROLME}/api/usuario/${page}/${count}`);
  }

  findById(idUsuario: number){
    return this.http.get(`${HOST_CONTROLME}/api/usuario/${idUsuario}`);
  }

  delete(idUsuario: number){
    return this.http.delete(`${HOST_CONTROLME}/api/usuario/${idUsuario}`);
  }

}
