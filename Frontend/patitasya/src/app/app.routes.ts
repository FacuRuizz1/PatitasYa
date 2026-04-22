import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';
import { ListarReportesComponent } from './componentes/reportes/listar-reportes/listar-reportes.component';
import { authGuard } from './guards/auth.guard';
import { DetalleReporteComponent } from './componentes/reportes/detalle-reporte/detalle-reporte.component';
import { CrearReporteComponent } from './componentes/reportes/crear-reporte/crear-reporte.component';
import { GraficoEstadisticasComponent } from './componentes/grafico-estadisticas/grafico-estadisticas.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro',component: RegistroComponent},
    {path: 'reportes', component: ListarReportesComponent, canActivate: [authGuard] },
    {path: 'reporte/:id', component: DetalleReporteComponent, canActivate: [authGuard]},
    {path: 'crear-reporte', component: CrearReporteComponent, canActivate: [authGuard]},
    { path: 'estadisticas', component: GraficoEstadisticasComponent, canActivate: [authGuard] },
    {path: '', redirectTo: "/login", pathMatch: 'full'}
];
