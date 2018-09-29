import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DialogService } from '../../../dialog-service';
import { Subcategoria } from '../../../model/subcategoria/subcategoria';
import { SubcategoriaService } from '../../../services/subcategoria/subcategoria.service';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-subcategoria-form',
  templateUrl: './subcategoria-form.component.html',
  styleUrls: ['./subcategoria-form.component.css']
})
export class SubcategoriaFormComponent extends CrudController<Subcategoria, {new(): Subcategoria}> implements OnInit {


  lblCategoria: string;
  idCategoria: Number;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private subcategoriaService: SubcategoriaService,
              private dialogRef: MatDialogRef<SubcategoriaFormComponent>) {
      super(router, Subcategoria, toastr, dialogService, subcategoriaService);
  }

  ngOnInit() {
    alert(this.objeto);

      this.lblCategoria = this.data.dsCategoria;
      this.idCategoria = this.data.idCategoria;

      if(this.data.objeto != undefined){
        this.objeto = this.data.objeto;      
      }
  }

  completarInserir() {
    this.objeto.idCategoria = this.idCategoria;
  }

  executarPosInserir() {
    this.fechar();
  }

  executarPosAlterar() {
    this.fechar();
  }

  fechar() {
    this.dialogRef.close();
  }

}
