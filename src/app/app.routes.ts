import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroUsuarioComponent } from './componentes/registro/registro.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { LoginGuard } from './guards/permiso.service';
import { RolesGuard } from './guards/roles.service';


export const routes: Routes = [
    { path: '',component: InicioComponent},
    {path: 'login', component: LoginComponent,canActivate: [LoginGuard]},
    {path: 'registro', component: RegistroUsuarioComponent,canActivate: [LoginGuard]},
    { path: "crear-negocio", component: CrearNegocioComponent,canActivate: [LoginGuard] },
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent},
    { path: "busqueda/:texto", component: BusquedaComponent},
    { path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["CLIENTE"] } },
    { path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {
    expectedRole: ["CLIENTE"] } },
    //{ path: "gestion-negocios", component: GestionNegociosComponent, canActivate:[RolesGuard], data: { expectedRole: ["MODERADOR"] } },
    {path: "**", pathMatch: "full", redirectTo: ""}
];
