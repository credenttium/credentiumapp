import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'plataforma-cadastrar',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadComponent: () => import('./page/principal/principal.page').then( m => m.PrincipalPage)
  },
  {
    path: 'credencial-cadastrar',
    loadComponent: () => import('./page/credencial/credencial-cadastrar/credencial-cadastrar.page').then( m => m.CredencialCadastrarPage)
  },
  {
    path: 'credencial',
    loadComponent: () => import('./page/credencial/credencial.page').then( m => m.CredencialPage)
  },
  {
    path: 'credencial-detalhar/:codigo',
    loadComponent: () => import('./page/credencial/credencial-detalhar/credencial-detalhar.page').then( m => m.CredencialDetalharPage)
  },
  {
    path: 'plataforma-cadastrar',
    loadComponent: () => import('./page/plataforma/plataforma-cadastrar/plataforma-cadastrar.page').then( m => m.PlataformaCadastrarPage)
  },
  {
    path: 'plataforma-detalhar',
    loadComponent: () => import('./page/plataforma/plataforma-detalhar/plataforma-detalhar.page').then( m => m.PlataformaDetalharPage)
  },
];
