import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../security/auth.guard';
import { CategoriaListComponent } from '../categoria/list/categoria-list.component';
import { CategoriaFormComponent } from '../categoria/form/categoria-form.component';
import { CategoriaIntvComponent } from '../categoria/intv/categoria-intv.component';
import { SubcategoriaFormComponent } from '../subcategoria/form/subcategoria-form.component';
import { CartaoListComponent } from '../cartao/list/cartao-list.component';
import { CartaoFormComponent } from '../cartao/form/cartao-form.component';
import { CartaoIntvComponent } from '../cartao/intv/cartao-intv.component';
import { ContaListComponent } from '../conta/list/conta-list.component';
import { ContaFormComponent } from '../conta/form/conta-form.component';
import { ContaIntvComponent } from '../conta/intv/conta-intv.component';
import { TransferenciaComponent } from '../transferencia/transferencia.component';
import { TransferenciaSaveComponent } from '../transferencia/save/transferencia-save.component';

export const CONTENT_ROUTES: Routes = [

        { path : '', component: HomeComponent, canActivate: [AuthGuard] },

        { path : 'categoria-form', component: CategoriaFormComponent, canActivate: [AuthGuard]},
        { path : 'categoria-list', component: CategoriaListComponent, canActivate: [AuthGuard]},
        { path : 'categoria-intv', component: CategoriaIntvComponent, canActivate: [AuthGuard]},

        { path : 'subcategoria-form', component: SubcategoriaFormComponent, canActivate: [AuthGuard]},

        { path : 'cartao-list', component: CartaoListComponent, canActivate: [AuthGuard]},
        { path : 'cartao-form', component: CartaoFormComponent, canActivate: [AuthGuard]},
        { path : 'cartao-intv', component: CartaoIntvComponent, canActivate: [AuthGuard]},

        { path : 'conta-list', component: ContaListComponent, canActivate: [AuthGuard]},
        { path : 'conta-form', component: ContaFormComponent, canActivate: [AuthGuard]},
        { path : 'conta-intv', component: ContaIntvComponent, canActivate: [AuthGuard]},

        { path : 'transferencia', component: TransferenciaComponent, canActivate: [AuthGuard]},
        { path : 'transferencia-save', component: TransferenciaSaveComponent, canActivate: [AuthGuard]},


]
