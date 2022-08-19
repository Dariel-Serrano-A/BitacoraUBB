import { Router } from "express";
import notasController from "../controllers/notasController";

class NotasRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.get("/", notasController.list);
        this.router.get("/:id", notasController.getOne);
        this.router.get("/detail/:id", notasController.getPersonalData);
        this.router.post("/", notasController.create);
        this.router.put("/:id", notasController.update);
        this.router.delete("/:id", notasController.delete);
    }
}

const notasRoutes = new NotasRoutes();
export default notasRoutes.router;

