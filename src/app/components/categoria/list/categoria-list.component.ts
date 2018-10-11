import { Component, OnInit, Pipe } from '@angular/core';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ResponseApi } from '../../../model/response-api';
import { DialogService } from '../../../dialog-service';
import { CategoriaFormComponent } from '../form/categoria-form.component';
import { CategoriaIntvComponent } from '../intv/categoria-intv.component';
import { SubcategoriaFormComponent } from '../../subcategoria/form/subcategoria-form.component';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';

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

  pagerReceita: any = {};
  pagedItemsReceita: any[];

  constructor(public router: Router,
              private dialog: MatDialog,
              public dialogService: DialogService,
              public toastr: ToastrService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService) {
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

  abrirModalAlterarSubcategoria(codigo) {    
    if(codigo != undefined) {
      this.subcategoriaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
    
                  this.dialog.open(SubcategoriaFormComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.popularListaDespesa();
                    this.popularListaReceita();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  abrirModalInativos(tipo) {    
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.data =  {tipo: tipo};    

    this.dialog.open(CategoriaIntvComponent, dialogConfig)
                          .afterClosed().subscribe(() => {
      this.popularListaDespesa();
      this.popularListaReceita();
    });  
  }

  abrirModalSubcategoria(idCategoria, dsCategoria) {    
    const dialogConfig = new MatDialogConfig();    
    dialogConfig.data =  {dsCategoria: dsCategoria,
                          idCategoria: idCategoria};

    this.dialog.open(SubcategoriaFormComponent, dialogConfig)
                          .afterClosed().subscribe(() => {
      this.popularListaDespesa();
      this.popularListaReceita();
    });  
  }

  popularListaDespesa() {
    //PESQUISAR DESPESA  
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

  inativarSubcategoria(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = false;
            this.subcategoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
              this.executarPosInativar();
              this.msgSucesso('O registro foi inativado com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

}
