import { Component, OnInit } from '@angular/core';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-recordatorio-list',
  templateUrl: './recordatorio-list.component.html',
  styleUrls: ['./recordatorio-list.component.css']
})
export class RecordatorioListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  recordatorios: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private recordatoriosServices: RecordatoriosService) { }

  ngOnInit(): void {
    this.getRecordatorios();
  }

  getRecordatorios(){
    this.recordatoriosServices.getRecordatorios()
    .subscribe(
      (res: any) => {
        this.recordatorios = res;
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
        this.recordatoriosServices.deleteRecordatorios(id)
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