import { HOST_CONTROLME } from '../controlme.api';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../model/usuario';

@Injectable()
export class TokenService {

  constructor(private http: HttpClient) {}

  validateAuthenticationToken(login: string, token: string){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(`${HOST_CONTROLME}/api/validate`, login, {headers});
  }

}
