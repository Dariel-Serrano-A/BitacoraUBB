import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { DataTablesModule } from "angular-datatables";
import Swal from 'sweetalert2'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BitacoraFormComponent } from './components/bitacora-form/bitacora-form.component';
import { BitacoraListComponent } from './components/bitacora-list/bitacora-list.component';

import { BitacorasService } from './services/bitacoras.service';
import { BitacoraDetailComponent } from './components/bitacora-detail/bitacora-detail.component';


//Parte Shauffa

import { CalendarioModule } from './components/calendario/calendario.module';
import { NotaFormComponent } from './components/nota-form/nota-form.component';
import { NotaListComponent } from './components/nota-list/nota-list.component';
import { NotasService } from './services/notas.service';
import { NotaDetailComponent } from './components/nota-detail/nota-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BitacoraFormComponent,
    BitacoraListComponent,
    BitacoraDetailComponent,
    NotaFormComponent,
    NotaListComponent,
    NotaDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    CalendarioModule
  ],
  providers: [
    BitacorasService
    ,NotasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
