import { HOST_CONTROLME } from './../controlme.api';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario } from '../../model/usuario';
import { TokenCadastro } from '../../model/token-cadastro';


@Injectable()
export class UsuarioService {

  constructor(private http: HttpClient) {}

  login(usuario: Usuario){
    return this.http.post(`${HOST_CONTROLME}/api/auth/login`, usuario);
  }

  registrar(usuario: Usuario) {
    return this.http.post(`${HOST_CONTROLME}/api/auth/registrar`, usuario);
  }

  ativar(tokenCadastro: TokenCadastro) {
    return this.http.post(`${HOST_CONTROLME}/api/auth/ativar`, tokenCadastro);
  }
}
