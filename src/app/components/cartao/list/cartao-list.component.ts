import { Component, OnInit, Pipe } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../dialog-service';
import { Cartao } from '../../../model/cartao/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { CartaoFormComponent } from '../form/cartao-form.component';
import { ResponseApi } from '../../../model/response-api';
import { CartaoIntvComponent } from '../intv/cartao-intv.component';

@Component({
  selector: 'app-cartao-list',
  templateUrl: './cartao-list.component.html',
  styleUrls: ['./cartao-list.component.css']
})
export class CartaoListComponent extends CrudController<Cartao, {new(): Cartao}> implements OnInit {

  constructor(public router: Router,
              private dialog: MatDialog,
              public dialogService: DialogService,
              public toastr: ToastrService,
              private cartaoService: CartaoService) {
    super(router, Cartao, toastr, dialogService, cartaoService);
  }

  ngOnInit() {
    this.popularListaCartao();
  }

  popularListaCartao() {
    this.pesquisar();
  }

  completarPesquisar() {
    this.objeto.fgAtivo = true;
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
  }

  abrirModalInserir() {    
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(CartaoFormComponent, dialogConfig)
                .afterClosed().subscribe(() => {
      this.popularListaCartao();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.cartaoService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(CartaoFormComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.popularListaCartao();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalInativos() {    
    const dialogConfig = new MatDialogConfig();

    this.dialog.open(CartaoIntvComponent, dialogConfig)
                          .afterClosed().subscribe(() => {
      this.popularListaCartao()
    });  
  }

  setarPrincipal(codigo) { 
    this.dialogService.confirm('Tem certeza que deseja marcar este cartão como principal?')
      .then((candelete:boolean) => {
          if(candelete){
            this.cartaoService.setarPrincipal(codigo).subscribe((responseApi:ResponseApi) => {
              this.objeto = responseApi['data'];
              this.popularListaCartao();

              this.msgSucesso('Seu cartão principal foi alterado com sucesso.');  
            } , err => {
              this.tratarErro(err);
            });
          }
      });
  }

  executarPosInativar() {
    this.popularListaCartao();
  }

}
