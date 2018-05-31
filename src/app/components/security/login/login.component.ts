import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../model/usuario';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../../../model/current-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario(null,'','','','','');
  message: string;
  public loading = false;

  constructor(private usuarioService: UsuarioService,
              private router: Router){
  }

  login(){
    this.loading = true;
    this.message = '';
    this.usuarioService.login(this.usuario)
      .subscribe((userAuthentication: CurrentUser) => {
          localStorage.setItem("cmUsr", JSON.stringify(userAuthentication.usuario));
          localStorage.setItem("cmTkn", userAuthentication.token);
          this.router.navigate(['/']);
          this.loading = true;
      } , err => {
          localStorage.removeItem("cmUsr");
          localStorage.removeItem("cmTkn");
          this.message = 'Não foi possivel entrar no sistema. Verifique suas credenciais e tente novamente. ';
          this.loading = true;
      });
  }

  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  ngOnInit() {

  }

}
