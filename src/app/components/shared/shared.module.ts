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
import { MatDialogModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';
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




const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
}; 

@NgModule({
    exports: [
      HeaderComponent,
      MenuComponent,      
      FooterComponent,    
      CommonModule
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
        MyDateRangePickerModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(),
        ToastrModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        MenuComponent,
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
