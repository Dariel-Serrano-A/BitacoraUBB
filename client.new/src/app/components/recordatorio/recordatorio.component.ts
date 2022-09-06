import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Recordatorio } from 'src/app/models/Recordatorio';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.css']
})
export class RecordatorioComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  recordatorio: any = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private recordatorioServices: RecordatoriosService) { }

  ngOnInit(): void {
    this.getRecordatorios();
  }

  getRecordatorios(){
    this.recordatorioServices.getRecordatorios()
    .subscribe(
      (res: any) => {
        this.recordatorio = res;
      },
      err=> {
        console.error(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err[1]}`,
          });
      }
    )
  }
  deleteRecordatorio(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No sera posible que reviertas la eliminacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.recordatorioServices.deleteRecordatorios(id)
        .subscribe(
          (res: any) => {
            this.getRecordatorios();
            Swal.fire(
              'Eliminado!',
              'El recordatorio ha sido eliminado.',
              'success'
            )
          }
        )
      }
    })
  }

}