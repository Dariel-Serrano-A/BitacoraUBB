import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Nota } from 'src/app/models/Nota';
import Swal from 'sweetalert2';

import {NotasService} from '../../services/notas.service'

@Component({
  selector: 'app-nota-detail',
  templateUrl: './nota-detail.component.html',
  styleUrls: ['./nota-detail.component.css']
})
export class NotaDetailComponent implements OnInit {

  nota: Nota ={
    idnotas: 0 ,
    titulo: '',
    contenido: '',
    usuario_idusuario: 1,
  };


  constructor(private notaService: NotasService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idnotas']) {
      this.notaService.getNota(params['idnotas'])
      .subscribe(
        (res: any = [])=> {
          this.nota=res[0];
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
