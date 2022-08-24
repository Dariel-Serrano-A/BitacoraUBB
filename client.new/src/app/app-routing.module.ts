import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraListComponent } from './components/bitacora-list/bitacora-list.component';
import { BitacoraFormComponent } from './components/bitacora-form/bitacora-form.component';
import { BitacoraDetailComponent } from './components/bitacora-detail/bitacora-detail.component';

import { CalendarioComponent } from './components/calendario/calendario.component';
import { NotaFormComponent } from './components/nota-form/nota-form.component';
import { NotaDetailComponent } from './components/nota-detail/nota-detail.component';
import { NotaListComponent } from './components/nota-list/nota-list.component';



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
  },
  {
    path: 'calendario',
    component: CalendarioComponent
  },
  {
    path: 'notas',
    component: NotaListComponent
  },
  {
    path: 'notas/add',
    component: NotaFormComponent
  },
  {
    path: 'notas/edit/:idnotas',
    component: NotaFormComponent
  },
  {
    path: 'notas/detail/:idnotas',
    component: NotaDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
