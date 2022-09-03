import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/models/Bitacora';
import {ActivatedRoute,Router} from '@angular/router'

import {BitacorasService} from '../../services/bitacoras.service'
import Swal from 'sweetalert2';

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
    created_at: '', 
    nombreArchivo: '',
    archivo: undefined
  };
   
  
  
  edit: boolean = false;
  titulo_bitacora: string = 'Registro de Bitácora'
  horaOdia: string = ''

  constructor(private bitacoraService: BitacorasService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idbitacora']) {
      this.bitacoraService.getBitacora(params['idbitacora'])
      .subscribe(
        (res: any = [])=> {
          this.bitacora=res[0];
          this.edit = true; 
          this.titulo_bitacora = 'Edición de Bitácora';
          this.bitacora.encompaniade=this.capitalizeFirstLetter(this.bitacora.encompaniade)
          this.bitacora.actividadcorrespondea=this.capitalizeFirstLetter(this.bitacora.actividadcorrespondea)
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
    this.bitacora.duracionactividad=this.bitacora.duracionactividad?.replace(/\:/,'')
    this.bitacora.duracionactividad=this.corregirDuracion(this.bitacora.duracionactividad)
    this.bitacora.encompaniade=this.bitacora.encompaniade?.toLowerCase()
    this.bitacora.actividadcorrespondea=this.bitacora.actividadcorrespondea?.toLowerCase()
    if (!this.bitacora.duracionactividad || this.bitacora.duracionactividad.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar la duración de actividad`,         
    })
    } else if (!this.validarNumString(this.bitacora.duracionactividad)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de duración de actividad no son validos`,         
    })
    } else if (this.bitacora.duracionactividad.length>1500){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Descripción de actividad supera límite de 1500 caracteres`,         
    })
    } else if (!this.bitacora.descripcionbitacora || this.bitacora.descripcionbitacora.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar la descripción de actividad`,        
    })
    }else if (!this.validarTexto(this.bitacora.descripcionbitacora)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de descripción de actividad no son validos`,         
    })
    }else if (!this.bitacora.encompaniade || this.bitacora.encompaniade.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar el tipo de compañía`,         
    })
    }else if (!this.validarTexto(this.bitacora.encompaniade)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de tipo de compañía no son validos`,    
    })
    }else if (!this.bitacora.actividadcorrespondea || this.bitacora.actividadcorrespondea.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar el tipo de actividad`,         
    })
    }else if (!this.validarTexto(this.bitacora.actividadcorrespondea)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de tipo de actividad no son validos`,         
    })
    }else {
      const formData = new FormData(); //creacion de formulario por codigo
      for ( var key in this.bitacora ) { //for para agregar llave/valor al form
        formData.append(key, (this.bitacora as any)[key]); //agregar llave/valor con los datos de bitacora
      }
      this.bitacoraService.saveBitacora(formData)
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
    this.bitacora.duracionactividad=this.bitacora.duracionactividad?.replace(/\:/,'')
    this.bitacora.duracionactividad=this.corregirDuracion(this.bitacora.duracionactividad)
    this.bitacora.encompaniade=this.bitacora.encompaniade?.toLowerCase()
    this.bitacora.actividadcorrespondea=this.bitacora.actividadcorrespondea?.toLowerCase()
    if (!this.bitacora.duracionactividad || this.bitacora.duracionactividad.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar la duración de actividad`,         
    })
    } else if (!this.validarNumString(this.bitacora.duracionactividad)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de duración de actividad no son validos`,         
    })
    } else if (this.bitacora.duracionactividad.length>1500){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Descripción de actividad supera límite de 1500 caracteres`,         
    })
    } else if (!this.bitacora.descripcionbitacora || this.bitacora.descripcionbitacora.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar la descripción de actividad`,        
    })
    }else if (!this.validarTexto(this.bitacora.descripcionbitacora)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de descripción de actividad no son validos`,         
    })
    }else if (!this.bitacora.encompaniade || this.bitacora.encompaniade.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar el tipo de compañía`,         
    })
    }else if (!this.validarTexto(this.bitacora.encompaniade)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de tipo de compañía no son validos`,    
    })
    }else if (!this.bitacora.actividadcorrespondea || this.bitacora.actividadcorrespondea.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Debe ingresar el tipo de actividad`,         
    })
    }else if (!this.validarTexto(this.bitacora.actividadcorrespondea)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Los caracteres de tipo de actividad no son validos`,         
    })
    }else{
      const formData = new FormData(); //creacion de formulario por codigo
      for ( var key in this.bitacora ) { //for para agregar llave/valor al form
        formData.append(key, (this.bitacora as any)[key]); //agregar llave/valor con los datos de bitacora
      }
      this.bitacoraService.updateBitacora(this.bitacora.idbitacora,formData)
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
    return /([0-9a-zA-ZÀ-ÿ\u00f1\u00d1,./: \n]*)*/g.test(texto);
  }

  validarNumString(texto: string){
    return /^([0-9])*$/g.test(texto);
  }
  corregirDuracion(texto: any){
    if(texto.match(/^(\d{4})$/g)){
      return texto.replace(/^(\d{4})$/g,'$1')
    } else if(texto.match(/^(\d{3})$/g)){
      return texto.replace(/^(\d{3})$/g,'0$1')
    } else if(texto.match(/^(\d{2})$/g)){
      return texto.replace(/^(\d{2})$/g,'00$1')
    } else if (texto.match(/^(\d{1})$/g)){
      return texto.replace(/^(\d{1})$/g,'000$1')
    } return texto
  }

  cambiarDuracion(event: any){
    event.target.value = event.target.value.replace(/\:/,'')
    event.target.value = event.target.value.replace(/^0/,'')
    if (event.target.value.match(/[^0-9]/ig)){
      event.target.value = event.target.value.replace(event.target.value,'')
    } else if(event.target.value.match(/^(\d{2})(\d{2})$/g)){
      event.target.value = event.target.value.replace(/^(\d{2})(\d{2})$/g, '$1:$2')
    } else if(event.target.value.match(/^(\d{1})(\d{2})$/g)){
      event.target.value = event.target.value.replace(/^(\d{1})(\d{2})$/g, '$1:$2')
    } else if(event.target.value.match(/^(\d{0})(\d{2})$/g)){
      event.target.value = event.target.value.replace(/^(\d{0})(\d{2})$/g, ':$2')
    } else if(event.target.value.match(/^(\d{0})(\d{1})$/g)){
      event.target.value = event.target.value.replace(/^(\d{0})(\d{1})$/g, ':0$2')
    } 
  }
  
  cambiarTexto(event: any){
    event.target.value = event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
    if(event.target.value.match(/^\d{1}/)){
      event.target.value = event.target.value.replace(/^\d{1}/g,'')
    } else if (event.target.value.match(/([^0-9a-zA-ZÀ-ÿ\u00f1\u00d1,./: \n]*)*/g)){
      event.target.value = event.target.value.replace(/([^0-9a-zA-ZÀ-ÿ\u00f1\u00d1,./: \n]*)*/g,'')
    }
  }

  archivoSeleccionado(event: any){
    const file: File = event.target.files[0];
    this.bitacora.nombreArchivo = file.name;
    this.bitacora.archivo = file; // event.target.files;
    //console.log(this.bitacora.archivo);
  }

  capitalizeFirstLetter(string: any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/* ejemplo ded formeteo de rut 
function cambiarRut(){
  document.getElementById('rut').addEventListener('input', function(evt) {
  let value = this.value.replace(/\./g, '').replace('-', '');
  if (value.match(/[^0-9k]/ig)) {
      value = value.replace(value, '');
  }
  if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  }
  else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
  }
  else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
  }
  else if (value.match(/^(\d)(\d{0,2})$/)) {
      value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
  }
  this.value = value;
  });
} */


}


