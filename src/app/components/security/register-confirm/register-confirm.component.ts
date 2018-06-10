import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenCadastro } from '../../../model/token-cadastro';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ResponseApi } from '../../../model/response-api';
import { Base } from '../../generic/base';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent extends Base {

  tokenCadastro = new TokenCadastro(null,null,'',false);

  constructor(private route: ActivatedRoute,
              public router: Router,
              private usuarioService: UsuarioService) {
        super(router);
  }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.tokenCadastro.idUsuario = params['id'];
      this.tokenCadastro.dsToken = params['token'];
    });

    //ATIVAR USUARIO
    this.usuarioService.ativar(this.tokenCadastro).subscribe((responseApi:ResponseApi) => {
      this.tokenCadastro = responseApi.data;

      //SUCESSO

    } , err => {
      this.showMessage({
        type: 'danger',
        text: err['error']['errors'][0]
      });
    });
  }

}
