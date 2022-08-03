import { Component } from '@angular/core';
 
import { EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
 
 
 
@Component({
 
    selector: 'app-root',
 
    templateUrl: './calendario.component.html',
 
    styleUrls: ['./calendario.component.css']
 
})
 
export class CalendarioComponent {
 
    public currentDate: Date = new Date(2018, 10, 30);
 
    public newViewMode: View = 'Month';
 
}
 