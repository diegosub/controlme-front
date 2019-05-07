import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { IMyDateRangeModel } from 'mydaterangepicker';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../dialog-service';
import { FiltroReceita } from '../../model/receita/filtro/filtro-receita';
import { Receita } from '../../model/receita/receita';
import { ResponseApi } from '../../model/response-api';
import { ReceitaService } from '../../services/receita/receita.service';
import { CrudController } from '../generic/crud-controller';
import { ReceitaSaveComponent } from './save/receita-save.component';


@Component({
  selector: 'app-receita',
  templateUrl: './receita.component.html',
  styleUrls: ['./receita.component.css']
})
export class ReceitaComponent extends CrudController<Receita, {new(): Receita}> implements OnInit {

  private periodo: any;

  constructor(public router: Router,
              public toastr: ToastrService,
              private dialog: MatDialog,
              dialogService: DialogService,
              private receitaService: ReceitaService) {
      super(router, Receita, toastr, dialogService, receitaService);
  }

  ngOnInit() {
    this.resetFiltros();
    this.pesquisarReceita();
  } 

  abrirModalInserir() {
    const dialogConfig = new MatDialogConfig();
    
    this.dialog.open(ReceitaSaveComponent, dialogConfig)
               .afterClosed().subscribe(() => {
      this.resetFiltros();
      this.pesquisarReceita();
    });  
  }

  abrirModalAlterar(codigo) {
    if(codigo != undefined) {
      this.receitaService.get(codigo)
                .subscribe((responseApi:ResponseApi) => {
                  this.objeto = responseApi['data']; 
                  const dialogConfig = new MatDialogConfig();    
                  dialogConfig.data =  {objeto: this.objeto};
                      
                  this.dialog.open(ReceitaSaveComponent, dialogConfig)
                            .afterClosed().subscribe(() => {
                    this.resetFiltros();
                    this.pesquisarReceita();
                  });  
                  
      } , err => {
        this.tratarErro(err);
      });
    }
  }

  resetFiltros() {
    this.periodo = {beginDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()},
                      endDate: {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()}};
    this.objeto.filtro = new FiltroReceita();
    this.objeto.filtro.dtReceitaInicio = new Date();
    this.objeto.filtro.dtReceitaFim = new Date();
    this.periodo.beginDate.year = new Date().getFullYear();
    this.periodo.beginDate.month = new Date().getMonth() + 1;
    this.periodo.beginDate.day = new Date().getDate();
    
    this.periodo.endDate =  {year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate()};
  }

  pesquisarReceita() {    
    this.objeto.idUsuario = this.getCodigoUsuarioLogado();
    this.objeto.fgAtivo = true;
    this.objeto.filtro = this.objeto.filtro;
 
    this.receitaService.pesquisar(this.objeto)
                .subscribe((responseApi:ResponseApi) => {
      this.lista = responseApi['data'];
    } , err => {
      this.tratarErro(err);
    });
  }
  
  selecionarPeriodoFiltro(event: IMyDateRangeModel) {
    this.objeto.filtro = new FiltroReceita(); 
    this.objeto.filtro.dtReceitaInicio = new Date(event.beginDate.year, event.beginDate.month-1, event.beginDate.day);
    this.objeto.filtro.dtReceitaFim = new Date(event.endDate.year, event.endDate.month-1, event.endDate.day);
    
    this.pesquisarReceita();
  }

  inativarReceita(id:string){
    this.dialogService.confirm('Tem certeza que deseja inativar esta receita?')
      .then((candelete:boolean) => {
          if(candelete){            
            //let status = false;
            this.receitaService.inativarReceita(id).subscribe((responseApi:ResponseApi) => {              
             
              this.resetFiltros();
              this.pesquisarReceita();

              this.msgSucesso('A receita foi inativada com sucesso.');             
            } , err => {
              this.tratarErro(err);              
            });
          }
      });
  }

}
