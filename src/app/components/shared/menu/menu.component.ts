import { Component, OnInit } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { CrudController } from '../../generic/crud-controller';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nome: String;
  email: String;
  nomeFormatado: String;

  arrayNome = [];

  constructor(public router: Router) {}

  ngOnInit() {
    this.email = JSON.parse(localStorage.getItem('cmUsr')).dsEmail; 
    this.nome = JSON.parse(localStorage.getItem('cmUsr')).dsNome;
    this.arrayNome = this.nome.split(" ");

    this.nomeFormatado = "";
    if(this.arrayNome[0] != undefined) {this.nomeFormatado += this.arrayNome[0]}    
    if(this.arrayNome[1] != undefined) {this.nomeFormatado += " "+this.arrayNome[1]}  
  }

  
  logout() {
    localStorage.removeItem("cmUsr");
    localStorage.removeItem("cmTkn");
    this.router.navigate(['/login']);
  }

}
