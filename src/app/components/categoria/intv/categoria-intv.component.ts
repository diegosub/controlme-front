import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DialogService } from '../../../dialog-service';
import { ResponseApi } from '../../../model/response-api';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';


@Component({
  selector: 'app-categoria-intv',
  templateUrl: './categoria-intv.component.html',
  styleUrls: ['./categoria-intv.component.css']
})
export class CategoriaIntvComponent extends CrudController<Categoria, {new(): Categoria}> implements OnInit {


  tipo: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private categoriaService: CategoriaService,
              private subcategoriaService: SubcategoriaService,
              private dialogRef: MatDialogRef<CategoriaIntvComponent>) {
      super(router, Categoria, toastr, dialogService, categoriaService);
  }

  ngOnInit() {
    this.pesquisarInativos();
  }

  pesquisarInativos() {
    if(this.data.tipo != undefined){
      this.tipo = this.data.tipo;
      this.objeto.tpCategoria = this.tipo.substring(0,1).toUpperCase().toString();
      this.objeto.idUsuario = this.getCodigoUsuarioLogado();

      this.categoriaService.pesquisarInativos(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
        
                  this.lista = responseApi['data'];                   
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  ativarSubcategoria(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar este registro?')
      .then((candelete:boolean) => {
          if(candelete){            
            let status = true;
            this.subcategoriaService.ativarInativar(id, status).subscribe((responseApi:ResponseApi) => {
              this.executarPosAtivar();
              this.msgSucesso('O registro foi ativado com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

  executarPosAtivar() {
    //this.fechar();
    this.pesquisarInativos();
  }

  fechar() {
    this.dialogRef.close();
  }

}
