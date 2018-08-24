import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenCadastro } from '../../../model/token-cadastro';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ResponseApi } from '../../../model/response-api';
import { CrudController } from '../../generic/crud-controller';
import { Usuario } from '../../../model/usuario';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css']
})
export class RegisterConfirmComponent extends CrudController<Usuario, {new(item?: any): Usuario}> {

  tokenCadastro = new TokenCadastro(null,null,'',false);

  controle = 'N';

  constructor(private route: ActivatedRoute,
              public router: Router,
              private usuarioService: UsuarioService) {
        super(router, null, null, null, null);
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
      //TOAS MESSAGE
      alert("erro");
    });
  }

}
