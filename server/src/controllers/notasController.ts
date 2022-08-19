import { Request, Response} from "express";
import promisePool from "../database";

class NotasController {
    public async list (req: Request, res: Response): Promise<void> {
        const response = Array();
        try {
            const [nota] = await promisePool.query('SELECT * FROM nota');  //consulta sql  
            res.json(nota);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No hay datos en la tabla de notas';
            res.json(response);
        }
    } 
    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response = Array();
        try {
            console.log(id);
            const [nota] = await promisePool.query('SELECT * FROM `nota` WHERE `idnotas` = ?', [id]);
            return res.json(nota);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No se pudo encontrar la nota';
            res.json(response);
        }
    } 
    public async getPersonalData (req: Request, res: Response): Promise<any> {
        const  id  = req.params;
        const response = Array();
        try {
            const [informacion,fields] = await promisePool.query(
                'SELECT `usuario`.* FROM `usuario` LEFT JOIN `nota` ON `nota`.`idnotas` = ? AND `nota`.`usuario_idusuario` = `usuario`.`idusuario`;', [id]);
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
        if(!req.body.titulo || req.body.titulo.length<=0 || !validarTexto(req.body.titulo)){
            response[0]=false;
            response[1]='Error en título de nota';
            res.json(response);
        }
        else if(!req.body.contenido || req.body.contenido.length<=0 || !validarTexto(req.body.contenido)){
            response[0]=false;
            response[1]='Error en descripción de nota';
            res.json(response);
        }
        else if (req.body.contenido.length>=500){
            response[0]=false;
            response[1]='Error en descripción de nota, no puede superar los 500 caracteres';
            res.json(response);
        }
        else{
            try {
                const [nota,fields] = await promisePool.query('INSERT INTO nota SET ?', [req.body]);
                response[0]=true;
                response[1]='Nota creada con éxito';
                res.json(response);
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='Error al crear la nota';
                res.json(response);
            }
        }
}
    public async update (req: Request, res: Response): Promise<void>{
        const id = req.params.id;
        const response = Array();
        req.body.titulo=req.body.titulo.toLowerCase()
        req.body.contenido=req.body.contenido.toLowerCase()
        req.body.contenido=capitalizeFirstLetter(req.body.contenido)
        if(!req.body.titulo || req.body.titulo.length<=0 || !validarTexto(req.body.titulo)){
            response[0]=false;
            response[1]='Error en título de nota';
            res.json(response);
        }
        else if(!req.body.contenido || req.body.contenido.length<=0 || !validarTexto(req.body.contenido)){
            response[0]=false;
            response[1]='Error en descripción de nota';
            res.json(response);
        }
        else if (req.body.contenido.length>=500){
            response[0]=false;
            response[1]='Error en descripción de nota, no puede superar los 500 caracteres';
            res.json(response);
        }
        else{
            try {
                const [nota,fields] = await promisePool.query('UPDATE nota SET ? WHERE idnotas = ?', [req.body,id]);
                response[0]=true;
                response[1]='Nota actualizada con éxito';
                res.json(response);
            } catch (error) {
                console.error(error);
                response[0]=false;
                response[1]='Error al actualizar la nota';
                res.json(response);
            }
        }
    }
    public async delete (req: Request, res: Response): Promise<void>{
        const id  = req.params.id;
        const response = Array();
        try {
            const [nota,fields] = await promisePool.query('DELETE FROM nota WHERE idnotas = ?', [id]);
            response[0]=true;
            response[1]='Nota eliminada con éxito';
            res.json(response);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='Error al eliminar la nota';
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
const notasController = new NotasController();
export default notasController; 
