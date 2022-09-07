"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendarioController_1 = __importDefault(require("../controllers/calendarioController"));
class CalendarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", calendarioController_1.default.list);
    }
}
const calendarioRoutes = new CalendarioRoutes();
exports.default = calendarioRoutes.router;
