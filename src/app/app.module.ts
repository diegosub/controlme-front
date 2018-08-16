import { TokenService } from './services/token/token.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthGuard } from './components/security/auth.guard';

import { AppComponent } from './app.component';

import { LoginComponent } from './components/security/login/login.component';
import { TemplateComponent } from './components/shared/template/template.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/security/register/register.component';
import { UsuarioService } from './services/usuario/usuario.service';
import { ConfirmComponent } from './components/security/confirm/confirm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { RegisterConfirmComponent } from './components/security/register-confirm/register-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TemplateComponent,
    RegisterComponent,
    ConfirmComponent,
    RegisterConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FormsModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    TokenService,
    UsuarioService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
