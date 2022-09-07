import { Request, Response } from "express";
import promisePool from "../database";

class CalendarioController{
    public async list (req: Request, res: Response): Promise<void> {
        const response = Array();
        try {
            const [calendario] = await promisePool.query('SELECT * FROM calendario');  //consulta sql  
            res.json(calendario);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No hay actividades en el calendario';
            res.json(response);
        }
    } 

    public async getOne (req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const response = Array();
        try {
            const [calendario] = await promisePool.query('SELECT * FROM calendario WHERE Id = ?', [id]);
            return res.json(calendario);
        } catch (error) {
            console.error(error);
            response[0]=false;
            response[1]='No hay actividades en el calendario';
            res.json(response);
        }
    } 

}
const calendariosController = new CalendarioController();
export default calendariosController; 
