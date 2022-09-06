"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recordatoriosController_1 = __importDefault(require("../controllers/recordatoriosController"));
class RecordatoriosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", recordatoriosController_1.default.list);
        this.router.get("/:id", recordatoriosController_1.default.getOne);
        this.router.get("/detail/:id", recordatoriosController_1.default.getPersonalData);
        this.router.post("/", recordatoriosController_1.default.create);
        this.router.put("/:id", recordatoriosController_1.default.update);
        this.router.delete("/:id", recordatoriosController_1.default.delete);
    }
}
const recordatoriosRoutes = new RecordatoriosRoutes();
exports.default = recordatoriosRoutes.router;
