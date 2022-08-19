import { Component, ViewEncapsulation } from '@angular/core';
 import {Ajax} from "@syncfusion/ej2-base";
import {
  EventSettingsModel,
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService
} from "@syncfusion/ej2-angular-schedule";

@Component({
 
    selector: 'app-root',
 
    templateUrl: './calendario.component.html',
 
    styleUrls: ['./calendario.component.css'],
encapsulation: ViewEncapsulation.None,
providers: [
  DayService,
  WeekService,
  WorkWeekService,
  MonthService,
  AgendaService,
  ResizeService,
  DragAndDropService
]
 
})
 
export class CalendarioComponent {
  public eventSettings: EventSettingsModel = {
    dataSource: []
  };
  public temp = true;

  onBound(args: any): void {
    if (this.temp) {
      let schObj = (document.querySelector(".e-schedule") as any)
        .ej2_instances[0];
      const ajax = new Ajax(
        "http://localhost:1092/Home/GetData",
        "GET",
        false
      );
      ajax.onSuccess = (data: any) => {
        schObj.eventSettings.dataSource = JSON.parse(data);
      };
      ajax.send();
      this.temp = false;
    }
  }

  onBegin(args: any): void {
    if (args.requestType === "eventCreate") {
      let schObj = (document.querySelector(".e-schedule") as any)
        .ej2_instances[0];
      const ajax = new Ajax(
        "http://localhost:1092/Home/Insert",
        "POST",
        false
      );
      ajax.data = JSON.stringify(args.data[0]);
      ajax.onSuccess = (data: any) => {
        schObj.eventSettings.dataSource = JSON.parse(data);
      };
      ajax.send();
    } else if (args.requestType === "eventChange") {
      let schObj = (document.querySelector(".e-schedule") as any)
        .ej2_instances[0];
      const ajax = new Ajax(
        "http://localhost:1092/Home/Update",
        "POST",
        false
      );
      ajax.data = JSON.stringify(args.data);
      ajax.onSuccess = (data: any) => {
        schObj.eventSettings.dataSource = JSON.parse(data);
      };
      ajax.send();
    } else if (args.requestType === "eventRemove") {
      let schObj = (document.querySelector(".e-schedule") as any)
        .ej2_instances[0];
      const ajax = new Ajax(
        "http://localhost:1092/Home/Delete",
        "POST",
        false
      );
      ajax.data = JSON.stringify(args.data[0]);
      ajax.onSuccess = (data: any) => {
        schObj.eventSettings.dataSource = JSON.parse(data);
      };
      ajax.send();
    }
  }

}
 