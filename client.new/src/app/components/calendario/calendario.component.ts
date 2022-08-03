import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MonthService, View, ResizeService, DragAndDropService } from '@syncfusion/ej2-angular-schedule';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-calendario',
  templateUrl: 'calendario.component.html',
  styleUrls: ['calendario.component.css'],
  providers: [MonthService, ResizeService, DragAndDropService],
  encapsulation: ViewEncapsulation.None
})
export class CalendarioComponent {
  public currentView: View = 'Month';
  public selectedDate: Date = new Date(2022, 8, 15);

  constructor(@Inject('sourceFiles') private sourceFiles: any) {
    sourceFiles.files = ['calendario.component.css'];
  }

  public getCellContent(date: Date): string {
    if (date.getMonth() === 10 && date.getDate() === 23) {
      return '<img src="./assets/schedule/images/thanksgiving-day.svg" /><div class="caption">Thanksgiving day</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
      return '<img src="./assets/schedule/images/get-together.svg" /><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 13) {
      return '<img src="./assets/schedule/images/get-together.svg" /><div class="caption">Party time</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 22) {
      return '<img src="./assets/schedule/images/birthday.svg" /><div class="caption">Happy birthday</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 24) {
      return '<img src="./assets/schedule/images/christmas-eve.svg" /><div class="caption">Christmas Eve</div>';
    } else if (date.getMonth() === 11 && date.getDate() === 25) {
      return '<img src="./assets/schedule/images/christmas.svg" /><div class="caption">Christmas Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 1) {
      return '<img src="./assets/schedule/images/newyear.svg" /><div class="caption">New Year"s Day</div>';
    } else if (date.getMonth() === 0 && date.getDate() === 14) {
      return '<img src="./assets/schedule/images/get-together.svg" /><div class="caption">Get together</div>';
    } else {
      return '';
    }
  }

}
