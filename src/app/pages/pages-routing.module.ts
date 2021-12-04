import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: 'home'
        },
        {
          path:'home',
          loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
        },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
