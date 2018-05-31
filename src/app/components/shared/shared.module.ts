import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { FormsModule } from '@angular/forms';
import { DialogService } from '../../dialog-service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from '../home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { CategoriaTitleComponent } from '../categoria/title/categoria-title.component';
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';

@NgModule({
    exports: [
      HeaderComponent,
      MenuComponent,
      FooterComponent,
      CategoriaTitleComponent,
      CommonModule
    ],
    imports: [
        FormsModule,
        RouterModule,
        FormsModule,
        HttpClientModule,
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        CategoriaListComponent,
        CategoriaTitleComponent,
        FooterComponent
    ],
    providers: [
      DialogService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
})
export class SharedModule { }
