import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria/categoria.service';
import { DialogService } from '../../../dialog-service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends CrudController<Categoria, {new(): Categoria}> implements OnInit {

  @ViewChild('dsCategoria') private elementRef: ElementRef;
  tipo: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              dialogService: DialogService,
              private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<CategoriaFormComponent>) {
      super(router, Categoria, toastr, dialogService, categoriaService);
  }

  ngOnInit() {
    if(this.data.tipo != undefined){
      this.tipo = this.data.tipo;
      this.objeto.tpCategoria = this.tipo.substring(0,1).toUpperCase().toString();
    }

    if(this.data.objeto != undefined){
      this.objeto = this.data.objeto;      
    }
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
