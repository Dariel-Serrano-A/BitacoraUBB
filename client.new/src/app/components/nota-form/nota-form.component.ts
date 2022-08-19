import { Component, OnInit } from '@angular/core';
import { Nota } from 'src/app/models/Nota';
import {ActivatedRoute,Router} from '@angular/router'
import {NotasService} from '../../services/notas.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nota-form',
  templateUrl: './nota-form.component.html',
  styleUrls: ['./nota-form.component.css']
})
export class NotaFormComponent implements OnInit {

  nota: Nota ={
    idnotas: 0 ,
    titulo: '',
    contenido: '',
    usuario_idusuario: 1,
    created_at: ''
  };

  edit: boolean = false;
  titulo_bitacora: string = 'Registro de Nota';


  constructor( private notaService: NotasService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['idnotas']) {
      this.notaService.getNota(params['idnotas'])
      .subscribe(
        (res: any = [])=> {
          this.nota=res[0];
          this.edit = true;
          this.titulo_bitacora = 'Edición de Nota';
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

  saveNewNota(){

    delete this.nota.idnotas;
    this.nota.created_at = new Date().toLocaleDateString("es-CL",  {timeZone: "America/Santiago"}).split('-').reverse().join('-');
    if (!this.nota.titulo || this.nota.titulo.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un título`,
        });
    }
    else if (!this.nota.contenido || this.nota.contenido.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un contenido`,
        });
    }
    else if (this.nota.contenido.length>=150){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede superar los 150 caracteres`,
        });
    }
    else if (this.nota.titulo.length>=10){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El título no puede superar los 10 caracteres`,
        });
    }
    else if (!this.validarTexto(this.nota.contenido)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede contener caracteres especiales`,
        });
    }
    else{
      this.notaService.saveNotas(this.nota)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `${this.nota.titulo} exitosa`,
            });
            setTimeout(() => {
          this.router.navigate(['/notas']);
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
updateNota(){

    delete this.nota.created_at;
    if (!this.nota.titulo || this.nota.titulo.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un título`,
        });
    }
    else if (!this.nota.contenido || this.nota.contenido.length<=0){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Ingrese un contenido`,
        });
    }
    else if (this.nota.contenido.length>=150){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede superar los 150 caracteres`,
        });
    }
    else if (this.nota.titulo.length>=10){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El título no puede superar los 10 caracteres`,
        });
    }
    else if (!this.validarTexto(this.nota.contenido)){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `El contenido no puede contener caracteres especiales`,
        });
    }
    else{
      this.notaService.updateNotas(this.nota.idnotas, this.nota)
      .subscribe(
        (res: any = [])=> {
          if(res[0]){
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: `${this.nota.titulo} exitosa`,
            });
            setTimeout(() => {
          this.router.navigate(['/notas']);
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
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
  }
}
