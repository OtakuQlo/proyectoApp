import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'pagina-principal',
    pathMatch: 'full'
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./Pages/inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionPageModule)
  },
  {
    path: 'pagina-principal',
    loadChildren: () => import('./Pages/pagina-principal/pagina-principal.module').then(m => m.PaginaPrincipalPageModule)
  },
  {
    path: 'pagina-producto',
    loadChildren: () => import('./Pages/pagina-producto/pagina-producto.module').then(m => m.PaginaProductoPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./Pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./Pages/modificar-perfil/modificar-perfil.module').then(m => m.ModificarPerfilPageModule)
  },
  {
    path: 'perfil-admin',
    loadChildren: () => import('./Pages/perfil-admin/perfil-admin.module').then( m => m.PerfilAdminPageModule)
  },
  {
    path: 'recu-contra',
    loadChildren: () => import('./Pages/recu-contra/recu-contra.module').then(m => m.RecuContraPageModule)
  },
  {
    path: 'cambiar-contra',
    loadChildren: () => import('./Pages/cambiar-contra/cambiar-contra.module').then(m => m.CambiarContraPageModule)
  },
  {
    path: 'modificar-perfil-admin',
    loadChildren: () => import('./Pages/modificar-perfil-admin/modificar-perfil-admin.module').then( m => m.ModificarPerfilAdminPageModule)
  },
  {
    path: 'panel-admin',
    loadChildren: () => import('./Pages/panel-admin/panel-admin.module').then( m => m.PanelAdminPageModule)
  },
  {
    path: 'recu-pregunta',
    loadChildren: () => import('./Pages/recu-pregunta/recu-pregunta.module').then( m => m.RecuPreguntaPageModule)
  },
  {
    path: 'ingresarcontra',
    loadChildren: () => import('./Pages/ingresarcontra/ingresarcontra.module').then( m => m.IngresarcontraPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./Pages/not-found/not-found.module').then(m => m.NotFoundPageModule)
  },  {
    path: 'anadir-producto',
    loadChildren: () => import('./Pages/anadir-producto/anadir-producto.module').then( m => m.AnadirProductoPageModule)
  },

  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
