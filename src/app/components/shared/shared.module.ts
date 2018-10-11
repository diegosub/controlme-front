import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

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
import { MatDialogModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

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
        ToastrModule.forRoot(),
        BsDatepickerModule.forRoot()
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
        FooterComponent,
        NotfoundComponent,
        FilterPipe
    ],
    providers: [
      PagerService,
      DialogService,
      CategoriaService,
      CartaoService,
      SubcategoriaService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      },
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
    ]
})
export class SharedModule { }
