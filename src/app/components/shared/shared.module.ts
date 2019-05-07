import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import {NgxMaskModule} from 'ngx-mask'
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../dialog-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriaTitleComponent } from '../categoria/title/categoria-title.component';
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CategoriaService } from '../../services/categoria/categoria.service';
import { CategoriaFormComponent } from '../categoria/form/categoria-form.component';
import { MatDialogModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE, MatRadioGroup, MatRadioModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { PagerService } from '../../services/pager.service';
import { FilterPipe } from '../generic/filter';
import { CategoriaIntvComponent } from '../categoria/intv/categoria-intv.component';
import { CartaoService } from '../../services/cartao/cartao.service';
import { SubcategoriaFormComponent } from '../subcategoria/form/subcategoria-form.component';
import { SubcategoriaService } from '../../services/subcategoria/subcategoria.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { CartaoListComponent } from '../cartao/list/cartao-list.component';
import { CartaoTitleComponent } from '../cartao/title/cartao-title.component';
import { CartaoFormComponent } from '../cartao/form/cartao-form.component';
import { SoNumberDirective } from '../../diretivas/so-number.directive';
import { CartaoIntvComponent } from '../cartao/intv/cartao-intv.component';
import { ContaListComponent } from '../conta/list/conta-list.component';
import { ContaFormComponent } from '../conta/form/conta-form.component';
import { ContaService } from '../../services/conta/conta.service';

import { CurrencyMaskModule } from "ng2-currency-mask";
import { DominioService } from '../../services/dominio/dominio.service';
import { ContaTitleComponent } from '../conta/title/conta-title.component';
import { ContaIntvComponent } from '../conta/intv/conta-intv.component';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
import { TransferenciaTitleComponent } from '../transferencia/title/transferencia-title.component';
import { TransferenciaSaveComponent } from '../transferencia/save/transferencia-save.component';
import { TransferenciaService } from '../../services/transferencia/transferencia.service';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { TransferenciaFixaService } from '../../services/transferencia/transferencia-fixa.service';
import { DespesaComponent } from '../despesa/despesa.component';
import { DespesaTitleComponent } from '../despesa/title/despesa-title.component';
import { DespesaService } from '../../services/despesa/despesa.service';
import { DespesaSaveComponent } from '../despesa/save/despesa-save.component';
import { DespesaCartaoComponent } from '../despesa-cartao/despesa-cartao.component';
import { DespesaCartaoSaveComponent } from '../despesa-cartao/save/despesa-cartao-save.component';
import { DespesaCartaoTitleComponent } from '../despesa-cartao/title/despesa-cartao-title.component';
import { DespesaCartaoService } from '../../services/despesa-cartao/despesa-cartao.service';
import { DespesaAgendamentoComponent } from '../despesa-agendamento/despesa-agendamento.component';
import { DespesaAgendamentoHeaderService } from '../../services/despesa-agendamento/despesa-agendamento-header.service';
import { DespesaAgendamentoTitleComponent } from '../despesa-agendamento/title/despesa-agendamento-title.component';
import { DespesaAgendamentoSaveComponent } from '../despesa-agendamento/save/despesa-agendamento-save.component';
import { Moeda } from '../../pipes/moeda';
import { DespesaFixaComponent } from '../despesa-fixa/despesa-fixa.component';
import { DespesaFixaTitleComponent } from '../despesa-fixa/title/despesa-fixa-title.component';
import { DespesaFixaService } from '../../services/despesa-fixa/despesa-fixa.service';
import { DespesaFixaSaveComponent } from '../despesa-fixa/save/despesa-fixa-save.component';
import { ReceitaService } from '../../services/receita/receita.service';
import { ReceitaComponent } from '../receita/receita.component';
import { ReceitaTitleComponent } from '../receita/title/receita-title.component';
import { ReceitaSaveComponent } from '../receita/save/receita-save.component';
import { ReceitaAgendamentoTitleComponent } from '../receita-agendamento/title/receita-agendamento-title.component';
import { ReceitaAgendamentoSaveComponent } from '../receita-agendamento/save/receita-agendamento-save.component';
import { ReceitaAgendamentoComponent } from '../receita-agendamento/receita-agendamento.component';
import { ReceitaAgendamentoHeaderService } from '../../services/receita-agendamento/receita-agendamento-header.service';
import { ReceitaFixaComponent } from '../receita-fixa/receita-fixa.component';
import { ReceitaFixaSaveComponent } from '../receita-fixa/save/receita-fixa-save.component';
import { ReceitaFixaTitleComponent } from '../receita-fixa/title/receita-fixa-title.component';
import { ReceitaFixaService } from '../../services/receita-fixa/receita-fixa.service';




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
}; 

@NgModule({
    exports: [
      HeaderComponent,
      MenuComponent,      
      FooterComponent,    
      CommonModule,
      Moeda,
    ],
    imports: [
        PerfectScrollbarModule,
        FormsModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        CommonModule,        
        MatDialogModule,
        MatToolbarModule,
        MatCardModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule, 
        CurrencyMaskModule,
        MatDatepickerModule, 
        MatNativeDateModule,
        MatRadioModule,
        MyDateRangePickerModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        Moeda,
        CategoriaListComponent,
        CategoriaTitleComponent,
        CategoriaFormComponent,
        CategoriaIntvComponent,
        SubcategoriaFormComponent,
        CartaoFormComponent,
        CartaoListComponent,
        CartaoTitleComponent,
        CartaoIntvComponent,
        ContaFormComponent,
        ContaListComponent,
        ContaTitleComponent,
        ContaIntvComponent,
        TransferenciaTitleComponent,
        TransferenciaSaveComponent,
        TransferenciaComponent,
        DespesaTitleComponent,
        DespesaSaveComponent,
        DespesaComponent,
        DespesaCartaoTitleComponent,
        DespesaCartaoSaveComponent,
        DespesaCartaoComponent,
        DespesaAgendamentoComponent,
        DespesaAgendamentoSaveComponent,
        DespesaAgendamentoTitleComponent,
        DespesaFixaComponent,
        DespesaFixaSaveComponent,
        DespesaFixaTitleComponent,
        ReceitaTitleComponent,
        ReceitaSaveComponent,
        ReceitaComponent,
        ReceitaAgendamentoTitleComponent,
        ReceitaAgendamentoSaveComponent,
        ReceitaAgendamentoComponent,
        ReceitaFixaComponent,
        ReceitaFixaSaveComponent,
        ReceitaFixaTitleComponent,
        FooterComponent,
        NotfoundComponent,
        FilterPipe,
        SoNumberDirective
    ],
    providers: [
      PagerService,
      DialogService,
      CategoriaService,
      CartaoService,
      ContaService,
      DominioService,
      SubcategoriaService,
      TransferenciaService,
      DespesaService,
      DespesaCartaoService,
      DespesaFixaService,
      DespesaAgendamentoHeaderService,
      ReceitaService,
      ReceitaAgendamentoHeaderService,
      ReceitaFixaService,
      TransferenciaFixaService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      },
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
    ]
})
export class SharedModule { }
