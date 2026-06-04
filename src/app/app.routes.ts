import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'sell',
    loadComponent: () => import('./sell/sell.page').then( m => m.SellPage)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./catalog/catalog.page').then( m => m.CatalogPage)
  },
  {
    path: 'comunity',
    loadComponent: () => import('./comunity/comunity.page').then( m => m.ComunityPage)
  },
  {
    path: 'notify',
    loadComponent: () => import('./notify/notify.page').then( m => m.NotifyPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'bidding',
    loadComponent: () => import('./bidding/bidding.page').then( m => m.BiddingPage)
  },
  {
    path: 'grade',
    loadComponent: () => import('./grade/grade.page').then( m => m.GradePage)
  },
  {
    path: 'details/:id',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },
  {
    path: 'account',
    loadComponent: () => import('./account/account.page').then( m => m.AccountPage)
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history.page').then( m => m.HistoryPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'bidding',
    loadComponent: () => import('./bidding/bidding.page').then( m => m.BiddingPage)
  },
  {
    path: 'grade',
    loadComponent: () => import('./grade/grade.page').then( m => m.GradePage)
  },
  {
    path: 'details',
    loadComponent: () => import('./details/details.page').then( m => m.DetailsPage)
  },

];
