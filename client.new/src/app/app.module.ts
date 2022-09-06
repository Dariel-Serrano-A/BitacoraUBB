import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { DataTablesModule } from "angular-datatables";
import Swal from 'sweetalert2'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BitacoraFormComponent } from './components/bitacora-form/bitacora-form.component';
import { BitacoraListComponent } from './components/bitacora-list/bitacora-list.component';

import { BitacorasService } from './services/bitacoras.service';
import { BitacoraDetailComponent } from './components/bitacora-detail/bitacora-detail.component';


//Parte Shauffa
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { NotaFormComponent } from './components/nota-form/nota-form.component';
import { NotaListComponent } from './components/nota-list/nota-list.component';
import { NotasService } from './services/notas.service';
import { NotaDetailComponent } from './components/nota-detail/nota-detail.component';
import { RecordatorioComponent } from './components/recordatorio/recordatorio.component';
import { RecordatorioFormComponent } from './components/recordatorio-form/recordatorio-form.component';
import { RecordatorioListComponent } from './components/recordatorio-list/recordatorio-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecordatoriosService } from './services/recordatorios.service';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BitacoraFormComponent,
    BitacoraListComponent,
    BitacoraDetailComponent,
    NotaFormComponent,
    NotaListComponent,
    NotaDetailComponent,
    RecordatorioComponent,
    RecordatorioListComponent,
    RecordatorioFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
  ],
  providers: [
    BitacorasService
    ,NotasService,
    RecordatoriosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
