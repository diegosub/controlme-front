import { NgModule } from '@angular/core';
import { LoginComponent } from './components/security/login/login.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './components/security/auth.guard';
import { TemplateComponent } from './components/shared/template/template.component';
import { CONTENT_ROUTES } from './components/shared/shared.routes';
import { RegisterComponent } from './components/security/register/register.component';
import { ConfirmComponent } from './components/security/confirm/confirm.component';
import { NotfoundComponent } from './components/shared/notfound/notfound.component';
import { RegisterConfirmComponent } from './components/security/register-confirm/register-confirm.component';


const appRoutes : Routes = [

    { path : 'login', component: LoginComponent },
    { path : 'registrar', component: RegisterComponent },
    { path : 'confirm', component: ConfirmComponent },
    { path : 'confirmarCadastro', component: RegisterConfirmComponent },
    { path : '', component: TemplateComponent, data: { title: 'full Views' }, children: CONTENT_ROUTES },
    { path : '**', component: NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
