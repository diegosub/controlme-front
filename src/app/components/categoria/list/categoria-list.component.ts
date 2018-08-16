import { Component, OnInit } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { CategoriaFormComponent } from '../form/categoria-form.component';
import { ConfirmComponent } from '../../security/confirm/confirm.component';
import { ToastrService } from 'ngx-toastr';
import { ResponseApi } from '../../../model/response-api';
import { PagerService } from '../../../services/pager.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent extends CrudController<Categoria, {new(): Categoria}> implements OnInit {

  listaDespesa = [];
  listaReceita = [];

  pagerDespesa: any = {};
  pagedItemsDespesa: any[];

  pagerReceita: any = {};
  pagedItemsReceita: any[];

  constructor(public router: Router,
              private dialog: MatDialog,
              private pagerService: PagerService,
              public toastr: ToastrService,
              private categoriaService: CategoriaService) {
    super(router, Categoria, toastr, categoriaService);
  }

  ngOnInit() {
    this.popularListaDespesa();
    this.popularListaReceita();
  }

  abrirModalInserir(tipo) { 

    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.data =  {tipo: tipo};

    this.dialog.open(CategoriaFormComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.popularListaDespesa();
      this.popularListaReceita();
    });
  ;
  }

  popularListaDespesa() {
    //PESQUISAR DESPESA
    let categoriaDespesa = new Categoria();
    categoriaDespesa.setTpCategoria = 'D';
    this.categoriaService.pesquisar(categoriaDespesa)
                         .subscribe((responseApi:ResponseApi) => {
        this.listaDespesa =  responseApi['data'];
        if(this.listaDespesa.length > 0) {
          this.setPageDespesa(1);
        }else{
          this.pagedItemsDespesa = [];
        }
    } , err => {
      this.tratarErro(err);
    });
  }  

  popularListaReceita() {
    //PESQUISAR RECEITA
    let categoriaReceita = new Categoria();
    categoriaReceita.setTpCategoria = 'R';
    this.categoriaService.pesquisar(categoriaReceita)
                         .subscribe((responseApi:ResponseApi) => {
        this.listaReceita =  responseApi['data'];

        if(this.listaReceita.length > 0) {
          this.setPageReceita(1);
        }else{
          this.pagedItemsReceita = [];
        }
    } , err => {
      this.tratarErro(err);
    });
  }

  setPageDespesa(page: number) {
    if (page < 1 || page > this.pagerDespesa.totalPages) {
        return;
    }

    this.pagerDespesa = this.pagerService.getPager(this.listaDespesa.length, page);
    this.pagedItemsDespesa = this.listaDespesa.slice(this.pagerDespesa.startIndex, this.pagerDespesa.endIndex + 1);
  }

  setPageReceita(page: number) {
    if (page < 1 || page > this.pagerReceita.totalPages) {
        return;
    }

    this.pagerReceita = this.pagerService.getPager(this.listaReceita.length, page);
    this.pagedItemsReceita = this.listaReceita.slice(this.pagerReceita.startIndex, this.pagerReceita.endIndex + 1);
  }

}
