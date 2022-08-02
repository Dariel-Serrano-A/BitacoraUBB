import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/models/Bitacora';
import {ActivatedRoute,Router} from '@angular/router'

import {BitacorasService} from '../../services/bitacoras.service'
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bitacora-form',
  templateUrl: './bitacora-form.component.html',
  styleUrls: ['./bitacora-form.component.css']
})
export class BitacoraFormComponent implements OnInit {
  

  bitacora: Bitacora = {
    idbitacora: 0 ,
    duracionactividad: '',
    descripcionbitacora: '',
    encompaniade: '' ,
    actividadcorrespondea: '',
    usuario_idusuario: 1,
    created_at: ''
   };

  

  edit: boolean = false;

  constructor(private bitacoraService: BitacorasService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idbitacora']) {
      this.bitacoraService.getBitacora(params['idbitacora'])
      .subscribe(
        (res: any = [])=> {
          this.bitacora=res[0];
          this.edit = true;      
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

   saveNewBitacora(){
    delete this.bitacora.idbitacora;
    this.bitacora.created_at = new Date().toLocaleDateString("es-CL",  {timeZone: "America/Santiago"}).split('-').reverse().join('-');
    if (!this.bitacora.duracionactividad || this.bitacora.duracionactividad.length<=0 || !this.validarNumString(this.bitacora.duracionactividad)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta duracion de actividad o sus caracteres no son validos`,         
    })
    }else if (!this.bitacora.descripcionbitacora || this.bitacora.descripcionbitacora.length<=0 || !this.validarTexto(this.bitacora.descripcionbitacora)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta descripcion de actividad o sus caracteres no son validos`,         
    })
    }else if (!this.bitacora.encompaniade || this.bitacora.encompaniade.length<=0 || !this.validarTexto(this.bitacora.encompaniade)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta tipo de compañia o la opcion no es valida`,         
    })
    }else if (!this.bitacora.actividadcorrespondea || this.bitacora.actividadcorrespondea.length<=0 || !this.validarTexto(this.bitacora.actividadcorrespondea)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta tipo de actividad o la opcion no es valida`,         
    })
    }else{
      this.bitacoraService.saveBitacora(this.bitacora)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: `${res[1]}`,                    
            })
            setTimeout(() => {
              this.router.navigate(['/bitacoras']);
            }, 2500) 
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
    
   }

   updateBitacora(){
    delete this.bitacora.created_at;
    if (!this.bitacora.duracionactividad || this.bitacora.duracionactividad.length<=0 || !this.validarNumString(this.bitacora.duracionactividad)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta duracion de actividad o sus caracteres no son validos`,         
    })
    } else if (this.bitacora.duracionactividad.length>500){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Descripcion de actividad supera limite de 500 caracteres`,         
    })
    } else if (!this.bitacora.descripcionbitacora || this.bitacora.descripcionbitacora.length<=0 || !this.validarTexto(this.bitacora.descripcionbitacora)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta descripcion de actividad o sus caracteres no son validos`,         
    })
    }else if (!this.bitacora.encompaniade || this.bitacora.encompaniade.length<=0 || !this.validarTexto(this.bitacora.encompaniade)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta tipo de compañia o la opcion no es valida`,         
    })
    }else if (!this.bitacora.actividadcorrespondea || this.bitacora.actividadcorrespondea.length<=0 || !this.validarTexto(this.bitacora.actividadcorrespondea)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Falta tipo de actividad o la opcion no es valida`,         
    })
    }else{
      this.bitacoraService.updateBitacora(this.bitacora.idbitacora,this.bitacora)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
            Swal.fire({
              icon: 'success',
              title: 'Exito',
              text: `${res[1]}`,                    
            })
            setTimeout(() => {
              this.router.navigate(['/bitacoras']);
            }, 2500) 
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
   }

  validarTexto(texto: string){
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
  }

  validarNumString(texto: string){
    return /^([0-9])*$/g.test(texto);
  }
  



  

}
