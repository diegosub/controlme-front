import { Component, OnInit, ViewChild } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { Base } from '../../generic/base';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ResponseApi } from '../../../model/response-api';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends Base {

  usuario = new Usuario(null,'','','','','');
  private fgCheck: boolean = true;

  constructor(public router: Router,
              private usuarioService: UsuarioService) {
    super(router);
  }

  ngOnInit() { }

  //REGISTRAR USUARIO
  salvar(){
    this.message = {};

    //VALIDAR SENHA MIN 5 CARACTERES
    if(this.usuario.dsSenha.length < 5) {
      this.showMessage({
        type: 'danger',
        text: "Não foi possível configurar sua conta. Sua senha deve conter no mínimo 5 caracteres."
      });

      return false;
    }

    //VALIDAR CONFIRMA SENHA
    if(this.usuario.dsSenha != this.usuario.dsConfirmarSenha) {
      this.showMessage({
        type: 'danger',
        text: "Não foi possível configurar sua conta. Verifique se você confirmou sua senha corretamente e tente novamente."
      });

      return false;
    }

    //REGISTRAR USUARIO
    this.usuarioService.registrar(this.usuario).subscribe((responseApi:ResponseApi) => {
      this.usuario = responseApi.data;

      //ABRIR MODAL COM MENSAGEM DE EMAIL ENVIADO E REDIRECIONAR PRO LOGIN


    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
    });

  }

}
