import { Component, OnInit } from '@angular/core';
import { BitacorasService } from '../../services/bitacoras.service'
import Swal from 'sweetalert2'
import { Subject } from 'rxjs';
import { Bitacora } from 'src/app/models/Bitacora';

@Component({
  selector: 'app-bitacora-list',
  templateUrl: './bitacora-list.component.html',
  styleUrls: ['./bitacora-list.component.css']
})
export class BitacoraListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  bitacoras: any = [];

  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private bitacorasServices: BitacorasService) { }

  ngOnInit(): void {
    this.dtOptions = {
      language:{
        url: "//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json"
      },
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getBitacoras();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getBitacoras(){
    this.bitacorasServices.getBitacoras()
    .subscribe(
      (res: any) => {
        this.bitacoras = res;
        // Llamando a DT trigger para manualmente renderizar la tabla
        this.dtTrigger.next(void 0);        
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

  deleteBitacora(id: any){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No sera posible que reviertas la eliminacion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bitacorasServices.deleteBitacora(id)
        .subscribe(
          (res: any = [])=> {
            if(res[0]){
              Swal.fire({
                icon: 'success',
                title: 'Borrado!',
                text: `${res[1]}`,                    
              })
              this.getBitacoras();
            } else {
              Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${res[1]}`,                
              });            
            }     
          },
          err=> console.error(err)   
        )
      }
    })
    
    
  }


}
