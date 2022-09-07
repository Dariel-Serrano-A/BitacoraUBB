//Parte Dariel
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
import { RegistroComponent } from './components/registro/registro.component';
import { RecordatoriosService } from './services/recordatorios.service';
import { ScheduleAllModule, RecurrenceEditorAllModule } from '@syncfusion/ej2-angular-schedule';
import {loadCldr, setCulture, setCurrencyCode} from '@syncfusion/ej2-base';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DropDownButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { AuthModule } from '@auth0/auth0-angular';
import { environment as env } from '../environments/environment';

import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';

import { DropDownListAllModule, MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';

import { MaskedTextBoxModule, UploaderAllModule } from '@syncfusion/ej2-angular-inputs';

import { ToolbarAllModule, ContextMenuAllModule } from '@syncfusion/ej2-angular-navigations';

import { ButtonAllModule, CheckBoxAllModule, SwitchAllModule } from '@syncfusion/ej2-angular-buttons';

import { DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { NumericTextBoxAllModule, TextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { AuthenticationButtonComponent } from './components/authentication-button/authentication-button.component';




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
    RecordatorioFormComponent,
    HomeComponent,
    RegistroComponent,
    CalendarioComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    AuthenticationButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    BrowserAnimationsModule,
    BrowserModule, ScheduleAllModule, RecurrenceEditorAllModule,
    DropDownButtonAllModule,
    TreeViewModule,
    DropDownListAllModule, MultiSelectAllModule,
    MaskedTextBoxModule, UploaderAllModule,
    ToolbarAllModule, ContextMenuAllModule,
    ButtonAllModule, CheckBoxAllModule, SwitchAllModule,
    DatePickerAllModule, TimePickerAllModule, DateTimePickerAllModule,
    NumericTextBoxAllModule, TextBoxAllModule],
  providers: [
    BitacorasService
    ,NotasService,
    RecordatoriosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
