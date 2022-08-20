import { Component, OnInit } from '@angular/core';
import { NotasService } from '../../services/notas.service';
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { Nota } from 'src/app/models/Nota';

@Component({
  selector: 'app-nota-list',
  templateUrl: './nota-list.component.html',
  styleUrls: ['./nota-list.component.css']
})
export class NotaListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  notas: any = [];
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private notasServices: NotasService) { }

  ngOnInit(): void {
    this.getNotas();
  }

  getNotas(){
    this.notasServices.getNotas()
    .subscribe(
      (res: any) => {
        this.notas = res;
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
  deleteNota(id: any){
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
        this.notasServices.deleteNotas(id)
        .subscribe(
          (res: any) => {
            this.getNotas();
            Swal.fire(
              'Eliminado!',
              'La nota ha sido eliminada.',
              'success'
            )
          }
        )
      }
    })
  }

}
