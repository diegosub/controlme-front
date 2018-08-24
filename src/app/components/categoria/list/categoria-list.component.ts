import { Component, OnInit, Pipe } from '@angular/core';
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
import { DialogService } from '../../../dialog-service';

@Pipe({
  name: 'searchfilter'
 })

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent extends CrudController<Categoria, {new(): Categoria}> implements OnInit {

  listaDespesa = [];
  listaReceita = [];

  filtroCategoriaDespesa: string;
  filtroCategoriaReceita: string;

  pagerDespesa: any = {};
  pagedItemsDespesa: any[];

  pagerReceita: any = {};
  pagedItemsReceita: any[];

  constructor(public router: Router,
              private dialog: MatDialog,
              dialogService: DialogService,
              public toastr: ToastrService,
              private categoriaService: CategoriaService) {
    super(router, Categoria, toastr, dialogService, categoriaService);
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
  }

  abrirModalAlterar(tipo, codigo) {
    if(codigo != undefined) {
      this.categoriaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {tipo: tipo, objeto: this.objeto};
    
                  this.dialog.open(CategoriaFormComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.popularListaDespesa();
                    this.popularListaReceita();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }

  }

  popularListaDespesa() {
    //PESQUISAR DESPESA
    let flag: boolean;    
    let categoriaDespesa = new Categoria();
    categoriaDespesa.tpCategoria = 'D';
    categoriaDespesa.fgAtivo = true;
    this.categoriaService.pesquisar(categoriaDespesa)
                         .subscribe((responseApi:ResponseApi) => {
        this.listaDespesa =  responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }  

  popularListaReceita() {
    //PESQUISAR RECEITA
    let categoriaReceita = new Categoria();
    categoriaReceita.tpCategoria = 'R';
    categoriaReceita.fgAtivo = true;
    this.categoriaService.pesquisar(categoriaReceita)
                         .subscribe((responseApi:ResponseApi) => {
        this.listaReceita =  responseApi['data'];
    } , err => {
      this.tratarErro(err);      
    });
  }

  executarPosInativar() {
    this.popularListaDespesa();
    this.popularListaReceita();
  }

}
