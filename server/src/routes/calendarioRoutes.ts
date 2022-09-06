import { Router } from "express";
import multer from '../libs/multer';

class CalendarioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }


config(): void {
    this.router.get("/");
}
}
const calendarioRoutes= new CalendarioRoutes();
export default  calendarioRoutes.router;