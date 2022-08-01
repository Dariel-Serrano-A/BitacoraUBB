import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bitacora } from 'src/app/models/Bitacora';
import { Informacion } from 'src/app/models/PersonalData';
import Swal from 'sweetalert2';

import {BitacorasService} from '../../services/bitacoras.service'


@Component({
  selector: 'app-bitacora-detail',
  templateUrl: './bitacora-detail.component.html',
  styleUrls: ['./bitacora-detail.component.css']
})
export class BitacoraDetailComponent implements OnInit {
  bitacora: Bitacora = {
    idbitacora: 0 ,
    duracionactividad: '',
    descripcionbitacora: '',
    encompaniade: '' ,
    actividadcorrespondea: '',
    usuario_idusuario: 1,
    created_at: undefined
   };
   informacion: Informacion = {
    idusuario: 0,
    nombre: '',
    apellido: '',
    rol_idrol: 0,
   };
   
   rol:string = ''
   
  constructor(private bitacoraService: BitacorasService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idbitacora']) {
      this.bitacoraService.getBitacora(params['idbitacora'])
      .subscribe(
        (res: any = [])=> {
          this.bitacora=res[0];
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
      this.bitacoraService.getPersonalData(params['idbitacora'])
      .subscribe(
        (res: any = [])=> {
          this.informacion=res[0];
          if (this.informacion.rol_idrol==1) {
            this.rol='Estudiante'
          }
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

  }

}
