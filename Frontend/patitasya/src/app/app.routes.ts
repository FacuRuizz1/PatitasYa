import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { RegistroComponent } from './componentes/auth/registro/registro.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registro',component: RegistroComponent},
    {path: '', redirectTo: "/login", pathMatch: 'full'}
];
