import { Component, OnInit, Pipe } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ResponseApi } from '../../../model/response-api';
import { DialogService } from '../../../dialog-service';
import { SubcategoriaFormComponent } from '../../subcategoria/form/subcategoria-form.component';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { Cartao } from '../../../model/cartao/cartao';
import { CartaoService } from '../../../services/cartao/cartao.service';
import { CartaoFormComponent } from '../form/cartao-form.component';

@Pipe({
  name: 'searchfilter'
 })

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

  }

  abrirModalInserir() {    
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(CartaoFormComponent, dialogConfig)
                .afterClosed().subscribe(() => {
      this.popularListaCartao();
    });  
  }

  abrirModalAlterar(tipo, codigo) {
    // if(codigo != undefined) {
    //   this.categoriaService.get(codigo)
    //             .subscribe((responseApi:ResponseApi) => {
    //               this.objeto = responseApi['data']; 
    //               const dialogConfig = new MatDialogConfig();    
    //               dialogConfig.data =  {tipo: tipo, objeto: this.objeto};
    
    //               this.dialog.open(CategoriaFormComponent, dialogConfig)
    //                         .afterClosed().subscribe(() => {
    //                 this.popularListaDespesa();
    //                 this.popularListaReceita();
    //               });  
                  
    //   } , err => {
    //     this.tratarErro(err);
    //   });
    // }
  }

  abrirModalInativos(tipo) {    
    // const dialogConfig = new MatDialogConfig();    
    // dialogConfig.data =  {tipo: tipo};    

    // this.dialog.open(CategoriaIntvComponent, dialogConfig)
    //                       .afterClosed().subscribe(() => {
    //   this.popularListaDespesa();
    //   this.popularListaReceita();
    // });  
  }

  executarPosInativar() {
    // this.popularListaDespesa();
    // this.popularListaReceita();
  }

}
