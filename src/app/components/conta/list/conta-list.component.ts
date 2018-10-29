import { Component, OnInit, Pipe } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
//import { ContaFormComponent } from '../form/conta-form.component';
import { ResponseApi } from '../../../model/response-api';
//import { ContaIntvComponent } from '../intv/conta-intv.component';
import { Conta } from '../../../model/conta/conta';
import { ContaService } from '../../../services/conta/conta.service';
import { ContaFormComponent } from '../form/conta-form.component';
import { ContaIntvComponent } from '../intv/conta-intv.component';


@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent extends CrudController<Conta, {new(): Conta}> implements OnInit {

  constructor(public router: Router,
              private dialog: MatDialog,
              public dialogService: DialogService,
              public toastr: ToastrService,
              private contaService: ContaService) {
    super(router, Conta, toastr, dialogService, contaService);
  }

  ngOnInit() {
    this.popularListaConta();
  }

  popularListaConta() {
    this.pesquisar();
  }

  completarPesquisar() {
    this.objeto.fgAtivo = true;
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
  }

  abrirModalInserir() {    
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(ContaFormComponent, dialogConfig)
                .afterClosed().subscribe(() => {
      this.popularListaConta();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.contaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(ContaFormComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.popularListaConta();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalInativos() {    
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(ContaIntvComponent, dialogConfig)
                          .afterClosed().subscribe(() => {
      this.popularListaConta()
    });  
  }

  setarPrincipal(codigo) { 
    this.dialogService.confirm('Tem certeza que deseja marcar esta conta como principal?')
      .then((candelete:boolean) => {
          if(candelete){
            this.contaService.setarPrincipal(codigo).subscribe((responseApi:ResponseApi) => {
              this.objeto = responseApi['data'];
              this.popularListaConta();

              this.msgSucesso('Sua conta principal foi alterado com sucesso.');  
            } , err => {
              this.tratarErro(err);
            });
          }
      });
  }

  executarPosInativar() {
    this.popularListaConta();
  }

}
