import { Request, Response } from "express";
import promisePool from "../database";

class RecordatoriosController{
    public async list (req: Request, res: Response): Promise<void> {
        const response = Array();
        try {
            const [recordatorio] = await promisePool.query('SELECT * FROM recordatorio');  //consulta sql  
            res.json(recordatorio);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No hay datos en la tabla de recordatorios';
            res.json(response);
        }
    } 
    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response = Array();
        try {
            console.log(id);
            const [recordatorio] = await promisePool.query('SELECT * FROM `recordatorio` WHERE `idrecordatorio` = ?', [id]);
            return res.json(recordatorio);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No se pudo encontrar el recordatorio';
            res.json(response);
        }
    } 
    public async getPersonalData (req: Request, res: Response): Promise<any> {
        const  id  = req.params;
        const response = Array();
        try {
            const [informacion,fields] = await promisePool.query(
                'SELECT `usuario`.* FROM `usuario` LEFT JOIN `recordatorio` ON `recordatorio`.`idrecordatorio` = ? AND `recordatorio`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
            return res.json(informacion);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No se pudo enviar la información';
            res.json(response);
        }
    } 
    public async create (req: Request, res: Response): Promise<void>{        
        const response = Array();
        console.log(req.body);
        if(!req.body.titulorecordatorio || req.body.titulorecordatorio.length<=0 || !validarTexto(req.body.titulo)){
            response[0]=false;
            response[1]='Error en título del recordatorio';
            res.json(response);
        }
        else if(!req.body.descripcionrecordatorio || req.body.descripcionrecordatorio.length<=0 || !validarTexto(req.body.descripcionrecordatorio)){
            response[0]=false;
            response[1]='Error en descripción del recordatorio';
            res.json(response);
        }
        else if (req.body.descripcionrecordatorio.length>=600){
            response[0]=false;
            response[1]='Error en descripción del recordatorio, no puede superar los 600 caracteres';
            res.json(response);
        }
        else{
            try {
                const [recordatorio,fields] = await promisePool.query('INSERT INTO recordatorio SET ?', [req.body]);
                response[0]=true;
                response[1]='Recordatorio creado con éxito';
                res.json(response);
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='Error al crear el recordatorio';
                res.json(response);
            }
        }
}
    public async update (req: Request, res: Response): Promise<void>{
        const id = req.params.id;
        const response = Array();
        req.body.titulorecordatorio=req.body.titulorecordatorio.toLowerCase()
        req.body.descripcionrecordatorio=req.body.descripcionrecordatorio.toLowerCase()
        req.body.descripcionrecordatorio=capitalizeFirstLetter(req.body.contenido)
        if(!req.body.titulorecordatorio || req.body.titulorecordatorio.length<=0 || !validarTexto(req.body.titulorecordatorio)){
            response[0]=false;
            response[1]='Error en título del recordatorio';
            res.json(response);
        }
        else if(!req.body.descripcionrecordatorio || req.body.descripcionrecordatorio.length<=0 || !validarTexto(req.body.descripcionrecordatorio)){
            response[0]=false;
            response[1]='Error en descripción del recordatorio';
            res.json(response);
        }
        else if (req.body.descripcionrecordatorio.length>=600){
            response[0]=false;
            response[1]='Error en descripción de nota, no puede superar los 600 caracteres';
            res.json(response);
        }
        else{
            try {
                const [recordatorio,fields] = await promisePool.query('UPDATE recordatorio SET ? WHERE idrecordatorio = ?', [req.body,id]);
                response[0]=true;
                response[1]='Recordatorio actualizado con éxito';
                res.json(response);
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='Error al actualizar el recordatorio';
                res.json(response);
            }
        }
    }
    public async delete (req: Request, res: Response): Promise<void>{
        const id  = req.params.id;
        const response = Array();
        try {
            const [recordatorio,fields] = await promisePool.query('DELETE FROM recordatorio WHERE idrecordatorio = ?', [id]);
            response[0]=true;
            response[1]='Recordatorio eliminado con éxito';
            res.json(response);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='Error al eliminar el recordatorio';
            res.json(response);
        }
    }
}
function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function validarTexto(texto: string){
    return /[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1\, \./]+/g.test(texto);
}
const recordatoriosController = new RecordatoriosController();
export default recordatoriosController; 
