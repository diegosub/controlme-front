import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReceitaFixaService } from '../../services/receita-fixa/receita-fixa.service';
import { DialogService } from '../../dialog-service';
import { ReceitaFixa } from '../../model/receita-fixa/receita-fixa';
import { ResponseApi } from '../../model/response-api';
import { CrudController } from '../generic/crud-controller';
import { ReceitaFixaSaveComponent } from './save/receita-fixa-save.component';


@Component({
  selector: 'app-receita-fixa',
  templateUrl: './receita-fixa.component.html',
  styleUrls: ['./receita-fixa.component.css']
})
export class ReceitaFixaComponent extends CrudController<ReceitaFixa, {new(): ReceitaFixa}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private receitaFixaService: ReceitaFixaService) {
      super(router, ReceitaFixa, toastr, dialogService, receitaFixaService);
  }

  ngOnInit() {
    // this.resetFiltros();
    this.pesquisarReceitaFixa();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(ReceitaFixaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      //this.resetFiltros();
      this.pesquisarReceitaFixa();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.receitaFixaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(ReceitaFixaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    //this.resetFiltros();
                    this.pesquisarReceitaFixa();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  pesquisarReceitaFixa() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
 
    this.receitaFixaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }

  executarPosInativar() {
    this.pesquisarReceitaFixa();
  }

}