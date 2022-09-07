import { Component, OnInit } from '@angular/core';
import { Recordatorio } from 'src/app/models/Recordatorio';
import { RecordatoriosService } from 'src/app/services/recordatorios.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-recordatorio-form',
  templateUrl: './recordatorio-form.component.html',
  styleUrls: ['./recordatorio-form.component.css']
})
export class RecordatorioFormComponent implements OnInit {
  recordatorio: Recordatorio ={
    idrecordatorio: 0 ,
    horarecordatorio: '',
    fecharecordatorio:'',
    titulorecordatorio: '',
    descripcionrecordatorio: '',
    email:'',
    usuario_idusuario: 1
  };

  edit: boolean = false;
  titulo_recordatorio: string = 'Registro de Recordatorio';
  horaOdia: string = ''


  constructor( private recordatorioService: RecordatoriosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idrecordatorio']) {
      this.recordatorioService.getRecordatorio(params['idrecordatorio'])
      .subscribe(
        (res: any = [])=> {
          this.recordatorio=res[0];
          this.edit = true;
          this.titulo_recordatorio = 'Edición de Recordatorio';
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

  saveNewRecordatorio(){

    delete this.recordatorio.idrecordatorio;
    this.recordatorio.fecharecordatorio = new Date().toLocaleDateString("es-CL",  {timeZone: "America/Santiago"}).split('-').reverse().join('-');
    if (!this.recordatorio.titulorecordatorio || this.recordatorio.titulorecordatorio.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un título`,
        });
    }
    else if (!this.recordatorio.descripcionrecordatorio || this.recordatorio.descripcionrecordatorio.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un contenido`,
        });
    }
    else if (this.recordatorio.descripcionrecordatorio.length>=600){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede superar los 600 caracteres`,
        });
    }
    else if (this.recordatorio.titulorecordatorio.length>=30){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El título no puede superar los 30 caracteres`,
        });
    }
    else if (!this.validarTexto(this.recordatorio.descripcionrecordatorio)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede contener caracteres especiales`,
        });
    }
    else{
      this.recordatorioService.saveRecordatorios(this.recordatorio)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `Guardado de ${this.recordatorio.titulorecordatorio} exitoso`,
            });
            setTimeout(() => {
          this.router.navigate(['/recordatorio']);
        }, 2500)
      }
        else {
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
updateRecordatorios(){
  delete this.recordatorio.idrecordatorio;
  this.recordatorio.fecharecordatorio = new Date().toLocaleDateString("es-CL",  {timeZone: "America/Santiago"}).split('-').reverse().join('-');
    if (!this.recordatorio.titulorecordatorio || this.recordatorio.titulorecordatorio.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un título`,
        });
    }
    else if (!this.recordatorio.descripcionrecordatorio || this.recordatorio.descripcionrecordatorio.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un contenido`,
        });
    }
    else if (this.recordatorio.descripcionrecordatorio.length>=600){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede superar los 600 caracteres`,
        });
    }
    else if (this.recordatorio.titulorecordatorio.length>=30){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El título no puede superar los 30 caracteres`,
        });
    }
    else if (!this.validarTexto(this.recordatorio.descripcionrecordatorio)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede contener caracteres especiales`,
        });
    }
    else{
      this.recordatorioService.updateRecordatorios(this.recordatorio.idrecordatorio, this.recordatorio)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `${this.recordatorio.titulorecordatorio} exitosa`,
            });
            setTimeout(() => {
          this.router.navigate(['/recordatorio']);
        }, 2500)
      }
        else {
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
}
