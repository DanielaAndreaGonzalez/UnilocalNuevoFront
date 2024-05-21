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
import { RecuperarCuentaComponent } from './componentes/recuperar-cuenta/recuperar-cuenta.component';
import { CambiarContrasenaComponent } from './componentes/cambiar-contrasena/cambiar-contrasena.component';
import { EditarUsuarioComponent } from './componentes/editar-usuario/editar-usuario.component';
import { ListaRecomendadosComponent } from './componentes/lista-recomendados/lista-recomendados.component';
import { InformacionNegocioComponent } from './componentes/informacion-negocio/informacion-negocio.component';
import { ListaFavoritosComponent } from './componentes/lista-favoritos/lista-favoritos.component';
import { NegociosPopularesComponent } from './componentes/negocios-populares/negocios-populares.component';
import { ListaNegociosComponent } from './componentes/lista-negocios/lista-negocios.component';
import { EditarNegocioComponent } from './componentes/editar-negocio/editar-negocio.component';
import { ResponderComentariosComponent } from './componentes/responder-comentarios/responder-comentarios.component';
import { HistorialRevisionesUsaComponent } from './componentes/historial-revisiones-usuario/historial-revisiones-usuario.component';
import { ListaPendientesModComponent } from './componentes/lista-pendientes-moderador/lista-pendientes-moderador.component';
import { HistorialRevisionesModComponent } from './componentes/historial-revisiones-moderador/historial-revisiones-moderador.component';
import { LoginModeradorComponent } from './componentes/login-moderador/login-moderador.component';


export const routes: Routes = [
    { path: '',component: InicioComponent},
    {path: 'login', component: LoginComponent,canActivate: [LoginGuard]},
    {path: 'login-moderador', component: LoginModeradorComponent,canActivate: [LoginGuard]},
    {path: 'registro', component: RegistroUsuarioComponent},
    {path: 'recuperar-cuenta', component: RecuperarCuentaComponent},
    {path: 'cambiar-contrasena', component: CambiarContrasenaComponent},
    {path: 'editar-usuario', component: EditarUsuarioComponent},
    {path: 'lista-recomendados', component: ListaRecomendadosComponent},
    {path: 'informacion-negocio/:idNegocio', component: InformacionNegocioComponent},
    {path: 'lista-favoritos', component: ListaFavoritosComponent},
    {path: 'negocios-populares', component: NegociosPopularesComponent},
    {path: 'lista-negocios', component: ListaNegociosComponent},
    {path: 'responder-comentarios', component: ResponderComentariosComponent},
    {path: 'historial-revisiones-usuario', component: HistorialRevisionesUsaComponent},
    { path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {
      expectedRole: ["CLIENTE"] } },
    {path: 'editar-negocio/:idNegocio', component: EditarNegocioComponent},
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent},
    { path: "busqueda/:texto", component: BusquedaComponent},
    {path: 'historial-revisiones-moderador', component: HistorialRevisionesModComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] } },
    { path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] } },
    {path: 'lista-pendientes', component: ListaPendientesModComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["MODERADOR"] }},
    //{ path: "gestion-negocios", component: GestionNegociosComponent, canActivate:[RolesGuard], data: { expectedRole: ["MODERADOR"] } },
    {path: "**", pathMatch: "full", redirectTo: ""}
];
