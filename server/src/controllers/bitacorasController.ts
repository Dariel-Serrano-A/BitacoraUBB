import {Request, Response} from 'express';
import fs from 'fs-extra';
import { RowDataPacket } from 'mysql2/promise';
import path from 'path';
import promisePool from '../database'
import {Bitacora} from '../models/Bitacora';

class BitacorasController {
    public async list (req: Request, res: Response): Promise<void> {
        const response = Array();
        try {
            const [bitacora] = await promisePool.query('SELECT * FROM bitacora');  //consulta sql  
            res.json(bitacora);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No hay datos en la tabla de bitacoras';
            res.json(response);
        }
    } 

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response = Array();
        try {
            const [bitacora] = await promisePool.query('SELECT * FROM bitacora WHERE idbitacora = ?', [id]);
            return res.json(bitacora);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='La bitacora no ha sido creada';
            res.json(response);
        }
    } 

    public async getPersonalData (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response = Array();
        try {
            const [informacion,fields] = await promisePool.query(
                'SELECT `usuario`.* FROM `usuario` LEFT JOIN `bitacora` ON `bitacora`.`idbitacora` = ? AND `bitacora`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
            return res.json(informacion);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No se pudo enviar la informacion';
            res.json(response);
        }
    } 

 
    public async create (req: Request, res: Response): Promise<void>{
        const allowedExtensions = /(.jpg|.jpeg|.png|.pdf|.txt)$/i;                 
        const response = Array();
        //Minusculas
        req.body.encompaniade=req.body.encompaniade.toLowerCase()
        req.body.actividadcorrespondea=req.body.actividadcorrespondea.toLowerCase()        
        //Capitalizacion de texto
        req.body.descripcionbitacora=capitalizeFirstLetter(req.body.descripcionbitacora)
        //Validaciones
        if(!req.body.duracionactividad || req.body.duracionactividad.length<=0){
            response[0]=false;
            response[1]='No se ha enviado duración de actividad';
            res.json(response);
        } else if(!validarNumString(req.body.duracionactividad)){
            response[0]=false;
            response[1]='Los caracteres de duración de actividad no son válidos';
            res.json(response);
        } else if(!req.body.descripcionbitacora || req.body.descripcionbitacora.length<=0){
            response[0]=false;
            response[1]='No se ha enviado descripción de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.descripcionbitacora)){
            response[0]=false;
            response[1]='Los caracteres de descripción de actividad no son válidos';
            res.json(response);
        } else if(req.body.descripcionbitacora.length>1500 ){
            response[0]=false;
            response[1]='La descripcion de actividad supera limite de 1500 caracteres';
            res.json(response);
        } else if(!req.body.encompaniade || req.body.encompaniade.length<=0){
            response[0]=false;
            response[1]='No se ha enviado la compañía de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.encompaniade)){
            response[0]=false;
            response[1]='Los caracteres de compañía de actividad no son válidos';
            res.json(response);
        } else if(!req.body.actividadcorrespondea || req.body.actividadcorrespondea.length<=0){
            response[0]=false;
            response[1]='No se ha enviado el tipo de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.actividadcorrespondea)){
            response[0]=false;
            response[1]='Los caracteres de tipo de actividad no son válidos';
            res.json(response);
        } else if(req.file){
            if(allowedExtensions.exec(req.file?.originalname)){
                req.body.nombreArchivo=req.file?.path
                try {
                    await promisePool.query('INSERT INTO bitacora set ?', req.body); //consulta sql
                    response[0]=true;
                    response[1]='La bitacora fue guardada con exito';
                    res.json(response);
                } catch (error) {
                    console.error(error);
                    response[0]=false;
                    response[1]='La bitacora no pudo ser guardada';
                    res.json(response);
                }   
            } else {
                response[0]=false;
                response[1]='El archivo no tiene una extencion valida, permitidas .jpg .jpeg .png .pdf .txt';
                res.json(response);
            }
            return  
        } else {                                       
           //Insercion de datos
           req.body.nombreArchivo = ''
            try {
                await promisePool.query('INSERT INTO bitacora set ?', req.body); //consulta sql
                response[0]=true;
                response[1]='La bitacora fue guardada con exito';
                res.json(response);                
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='La bitacora no pudo ser guardada';
                res.json(response);
                
            }               
        }   
    }
 
    public async update (req: Request, res: Response): Promise<void>{
        const id = req.params.id;        
        const response = Array();
        //Minusculas
        req.body.encompaniade=req.body.encompaniade.toLowerCase()
        req.body.actividadcorrespondea=req.body.actividadcorrespondea.toLowerCase()
        req.body.nombreArchivo=req.file?.originalname
        //Capitalizacion de texto
        req.body.descripcionbitacora=capitalizeFirstLetter(req.body.descripcionbitacora)
        //Validaciones
        if(!req.body.duracionactividad || req.body.duracionactividad.length<=0){
            response[0]=false;
            response[1]='No se ha enviado duración de actividad';
            res.json(response);
        } else if(!validarNumString(req.body.duracionactividad)){
            response[0]=false;
            response[1]='Los caracteres de duración de actividad no son válidos';
            res.json(response);
        } else if(!req.body.descripcionbitacora || req.body.descripcionbitacora.length<=0){
            response[0]=false;
            response[1]='No se ha enviado descripción de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.descripcionbitacora)){
            response[0]=false;
            response[1]='Los caracteres de descripción de actividad no son válidos';
            res.json(response);
        } else if(req.body.descripcionbitacora.length>1500 ){
            response[0]=false;
            response[1]='La descripcion de actividad supera limite de 1500 caracteres';
            res.json(response);
        } else if(!req.body.encompaniade || req.body.encompaniade.length<=0){
            response[0]=false;
            response[1]='No se ha enviado la compañía de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.encompaniade)){
            response[0]=false;
            response[1]='Los caracteres de compañía de actividad no son válidos';
            res.json(response);
        } else if(!req.body.actividadcorrespondea || req.body.actividadcorrespondea.length<=0){
            response[0]=false;
            response[1]='No se ha enviado el tipo de actividad';
            res.json(response);
        } else if(!validarTexto(req.body.actividadcorrespondea)){
            response[0]=false;
            response[1]='Los caracteres de tipo de actividad no son válidos';
            res.json(response);
        } else if(req.body.nombreArchivo){
            response[0]=false;
            response[1]='Los caracteres de tipo de actividad no son válidos';
            res.json(response);
        } else { //Actualizacion de datos
            try {
                await promisePool.query('UPDATE bitacora set ? WHERE idbitacora = ?', [req.body,id]);
                response[0]=true;
                response[1]='La bitacora fue actualizada con exito';
                res.json(response);
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='La bitacora no pudo ser actualizada';
                res.json(response);
            }
            
        }                             
    }

    public async delete (req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const response = Array();
        try {
            //Eliminacion de datos
            const [bitacora] = await promisePool.query('SELECT * FROM bitacora WHERE idbitacora = ?', [id]);
            if ((bitacora as RowDataPacket[])[0].nombreArchivo) {
                await fs.unlink(path.resolve((bitacora as RowDataPacket[])[0].nombreArchivo));                
            }
            await promisePool.query('DELETE FROM bitacora WHERE idbitacora = ?', [id]);
            response[0]=true;
            response[1]='La bitacora fue eliminada';
            res.json(response);
        } catch (error) {
            console.error(error);
                response[0]=false;
                response[1]='La bitacora no pudo ser eliminada';
                res.json(response);
        }
    }    
}



function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function validarNumString(texto: string){
    return /^([0-9])*$/g.test(texto);
}

function validarTexto(texto: string){
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
}


const  bitacorasController = new BitacorasController ();
export default bitacorasController;