import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DividaService } from '../../services/divida/divida.service';
import { DialogService } from '../../dialog-service';
import { Divida } from '../../model/divida/divida';
import { ResponseApi } from '../../model/response-api';
import { CrudController } from '../generic/crud-controller';
import { Dominio } from '../../model/dominio/dominio';
import { DominioService } from '../../services/dominio/dominio.service';
import { moment } from 'ngx-bootstrap/chronos/test/chain';


@Component({
  selector: 'app-divida',
  templateUrl: './divida.component.html',
  styleUrls: ['./divida.component.css']
})
export class DividaComponent extends CrudController<Divida, {new(): Divida}> implements OnInit {

  nrAnoIni: number = 2019;
  nrAnoFim: number = new Date().getFullYear()+1;

  listaMes = [];
  listaAno = [];

  nrMes;
  nrAno;
  vlTotal: number;

  constructor(public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private dominioService: DominioService,
              private dividaService: DividaService) {
      super(router, Divida, toastr, dialogService, dividaService);
  }

  ngOnInit() {

    this.nrMes = (new Date().getMonth()+1).toString();
    this.nrAno = new Date().getFullYear();
    this.vlTotal = 0;

    this.popularListaMesAno();
    this.pesquisarDivida();
  }

  popularListaMesAno() {
    // ano
    for (let i = this.nrAnoIni; i <= this.nrAnoFim; i++) {
      this.listaAno.push(i);
    }

    // mes
    let dominio: Dominio = new Dominio();
    dominio.dsCampo = 'NR_MES';

    this.dominioService.pesquisarPorCampo(dominio)
                .subscribe((responseApi:ResponseApi) => {
      this.listaMes = responseApi['data']; 
    });
  }

  pesquisarDivida() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.nrMesVencimento = this.nrMes;
    this.objeto.nrAnoVencimento = this.nrAno;

    this.dividaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];

      this.lista.forEach(element => {

        this.vlTotal = this.vlTotal + element.vlDespesa;

        if(element.dtVencimento == null || typeof element.dtVencimento == 'undefined') {
          element.dtVencimento = new Date(this.nrAno, this.nrMes - 1, element.nrDiaVencimento);

          let venc = moment(element.dtVencimento);
          let hj = moment(new Date());

          element.nrDiaDiferenca = venc.diff(hj, 'days')+1;
        }
        
      });
    } , err => {
      this.tratarErro(err);
    });
  }


}
