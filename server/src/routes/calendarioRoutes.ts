import { Router } from "express";
import calendarioController from "../controllers/calendarioController";

class CalendarioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", calendarioController.list);
    }
}
const calendarioRoutes = new CalendarioRoutes();
export default calendarioRoutes.router;