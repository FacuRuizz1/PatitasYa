import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { ListarReportesComponent } from './componentes/reportes/listar-reportes/listar-reportes.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro',component: RegistroComponent},
    {path: 'reportes', component: ListarReportesComponent, canActivate: [authGuard] },
    {path: '', redirectTo: "/login", pathMatch: 'full'}
];
