import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudController } from '../../generic/crud-controller';
import { Categoria } from '../../../model/categoria/categoria';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../../services/categoria/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent extends CrudController<Categoria, {new(): Categoria}> implements OnInit {


  tipo: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
              public router: Router,
              public toastr: ToastrService,
              private categoriaService: CategoriaService,
              private dialogRef: MatDialogRef<CategoriaFormComponent>) {
      super(router, Categoria, toastr, categoriaService);
  }

  ngOnInit() {
    if(this.data.tipo != undefined){
      this.tipo = this.data.tipo;
      this.objeto.setTpCategoria = this.tipo.substring(0,1).toUpperCase().toString();
    }
  }

  executarPosInserir() {
    this.dialogRef.close();
  }

  fechar() {
    this.dialogRef.close();
  }

}
