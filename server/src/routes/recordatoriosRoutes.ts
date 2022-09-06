import { Router } from "express";
import recordatoriosController from "../controllers/recordatoriosController";

class RecordatoriosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", recordatoriosController.list);
        this.router.get("/:id", recordatoriosController.getOne);
        this.router.get("/detail/:id", recordatoriosController.getPersonalData);
        this.router.post("/", recordatoriosController.create);
        this.router.put("/:id", recordatoriosController.update);
        this.router.delete("/:id", recordatoriosController.delete);
    }
}

const recordatoriosRoutes = new RecordatoriosRoutes();
export default recordatoriosRoutes.router;
