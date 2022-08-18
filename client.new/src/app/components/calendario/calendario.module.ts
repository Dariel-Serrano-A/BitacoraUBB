import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarioComponent } from './calendario.component';
import { CalendarioRoutingModule } from './calendario-routing.module';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import { WeekService, WorkWeekService, MonthService, AgendaService } from '@syncfusion/ej2-angular-schedule';
import { ActivatedRoute, Router } from '@angular/router';



@NgModule({
  declarations: [CalendarioComponent],
  imports: [
    CommonModule,
    BrowserModule,
    CalendarioRoutingModule,
    ScheduleModule
  ],
  providers: [WeekService, WorkWeekService, MonthService, AgendaService],
  bootstrap:    [ CalendarioComponent]
})
export class CalendarioModule { }
