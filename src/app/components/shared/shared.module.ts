import { NgModule } from '@angular/core';
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


@NgModule({
    exports: [
      HeaderComponent,
      MenuComponent,      
      FooterComponent,    
      CommonModule
    ],
    imports: [
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
        ToastrModule.forRoot()
    ],
    declarations: [
        HomeComponent,
        HeaderComponent,
        MenuComponent,
        CategoriaListComponent,
        CategoriaTitleComponent,
        CategoriaFormComponent,
        FooterComponent,
        NotfoundComponent
    ],
    providers: [
      PagerService,
      DialogService,
      CategoriaService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ]
})
export class SharedModule { }
