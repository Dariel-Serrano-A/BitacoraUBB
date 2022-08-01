import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BitacoraListComponent } from './components/bitacora-list/bitacora-list.component';
import { BitacoraFormComponent } from './components/bitacora-form/bitacora-form.component';
import { BitacoraDetailComponent } from './components/bitacora-detail/bitacora-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/bitacoras',
    pathMatch: 'full'
  },
  {
    path: 'bitacoras',
    component: BitacoraListComponent
  },
  {
    path: 'bitacoras/add',
    component: BitacoraFormComponent
  },
  {
    path: 'bitacoras/edit/:idbitacora',
    component: BitacoraFormComponent
  },
  {
    path: 'bitacoras/detail/:idbitacora',
    component: BitacoraDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
