import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  EventSettingsModel,
  View,
  EventRenderedArgs,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService,
  GroupModel,
  WorkHoursModel,
  ScheduleComponent
} from "@syncfusion/ej2-angular-schedule";
import { L10n, loadCldr } from '@syncfusion/ej2-base';
import { UrlAdaptor, DataManager, Query } from "@syncfusion/ej2-data";
import { zooEventsData } from "./data";
import { extend, Ajax } from "@syncfusion/ej2-base";

declare let require: Function;
 loadCldr(
      require('cldr-data/supplemental/numberingSystems.json'),
      require('cldr-data/main/es/ca-gregorian.json'),
      require('cldr-data/main/es/currencies.json'),
      require('cldr-data/main/es/numbers.json'),
      require('cldr-data/main/es/timeZoneNames.json')
    );
   L10n.load({
        "es": {
      "schedule": {
        "day": "Día",
        "week": "Semana",
        "workWeek": "Semana laboral",
        "month": "Mes",
        "agenda": "Agenda",
        "weekAgenda": "Agenda semanal",
        "workWeekAgenda": "Agenda de la semana laboral",
        "monthAgenda": "Month Agenda",
        "today": "Hoy",
        "noEvents": "Sin eventos",
        "emptyContainer": "No hay eventos programados para hoy.",
        "allDay": "Todo el día",
        "start": "Inicio",
        "end": "Fin",
        "more": "Más",
        "close": "Cerrar",
        "cancel": "Cancelar",
        "noTitle": "(Sin título)",
        "delete": "Borrar",
        "deleteEvent": "Borrar evento",
        "deleteMultipleEvent": "Borrar eventos",
        "selectedItems": "Items seleccionados",
        "deleteSeries": "Borrar series",
        "edit": "Editar",
        "editSeries": "Editar series",
        "editEvent": "Editar evento",
        "createEvent": "Crear",
        "subject": "Título",
        "addTitle": "Añadir título",
        "moreDetails": "Más Detalles",
        "save": "Guardar",
        "editContent": "¿Quieres editar sólo este evento o la serie entera?",
        "deleteRecurrenceContent": "¿Quieres borrar sólo este evento o toda la serie?",
        "deleteContent": "¿Estás seguro de que quieres borrar este evento?",
        "deleteMultipleContent": "¿Estás seguro de que quieres borrar los eventos seleccionados?",
        "newEvent": "Nuevo evento",
        "title": "Título",
        "location": "Ubicación",
        "description": "Descripción",
        "timezone": "Zona horaria",
        "startTimezone": "Zona horaria inicial",
        "endTimezone": "Zona horaria final",
        "repeat": "Repetir",
        "saveButton": "Guardar",
        "cancelButton": "Cancelar",
        "deleteButton": "Borrar",
        "recurrence": "Recurrencia",
        "wrongPattern": "El patrón de recurrencia no es válido.",
        "seriesChangeAlert": "Los cambios hechos a instancias específicas de esta serie serán cancelados y esos eventos volverán a coincidir con la serie.",
        "createError": "La duración del evento debe ser más corta que la frecuencia con la que se produce. Acorta la duración o cambia el patrón de recurrencia en el editor de eventos de recurrencia.",
        "recurrenceDateValidation": "Algunos meses tienen menos de la fecha seleccionada. Para estos meses, la ocurrencia caerá en la última fecha del mes.",
        "sameDayAlert": "Dos ocurrencias del mismo evento no pueden ocurrir en el mismo día.",
        "editRecurrence": "Editar recurrencia",
        "repeats": "Repeticiones",
        "alert": "Alerta",
        "startEndError": "La fecha final seleccionada se produce antes de la fecha de inicio.",
        "invalidDateError": "El valor de la fecha introducida no es válido.",
        "ok": "Ok",
        "occurrence": "Occurrencia",
        "series": "Series",
        "previous": "Anterior",
        "next": "Siguiente",
        "timelineDay": "Línea de tiempo diaria",
        "timelineWeek": "Línea de tiempo semanal",
        "timelineWorkWeek": "Línea de tiempo laboral",
        "timelineMonth": "Línea de tiempo mensual"
    },
    "recurrenceeditor": {
        "none": "Ninguno",
        "daily": "Diariamente",
        "weekly": "Semanalmente",
        "monthly": "Mensualmente",
        "month": "Mes",
        "yearly": "Anualmente",
        "never": "Nunca",
        "until": "Hasta",
        "count": "Cuenta",
        "first": "Primero",
        "second": "Segundo",
        "third": "Tercero",
        "fourth": "Cuarto",
        "last": "Último",
        "repeat": "Repetir",
        "repeatEvery": "Repetir cada",
        "on": "Repetir en",
        "end": "Fin",
        "onDay": "Día",
        "days": "Día(s)",
        "weeks": "Semana(s)",
        "months": "Mes(es)",
        "years": "Año(s)",
        "every": "cada",
        "summaryTimes": "tiempo(s)",
        "summaryOn": "en",
        "summaryUntil": "hasta",
        "summaryRepeat": "Repeticiones",
        "summaryDay": "día(s)",
        "summaryWeek": "semana(s)",
        "summaryMonth": "mes(es)",
        "summaryYear": "año(s)"
    },
    "calendar": {
      "today": "Hoy"
    },
  }
  });
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  providers: [
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    AgendaService,
    ResizeService,
    DragAndDropService
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalendarioComponent  {
public selectedDate: Date = new Date(2022, 8, 6);}

