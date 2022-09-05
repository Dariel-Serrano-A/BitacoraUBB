"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bitacorasController_1 = __importDefault(require("../controllers/bitacorasController"));
const multer_1 = __importDefault(require("../libs/multer"));
class BitacorasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', bitacorasController_1.default.list);
        this.router.get('/:id', bitacorasController_1.default.getOne);
        this.router.get('/detail/:id', bitacorasController_1.default.getPersonalData);
        this.router.route('/').post(multer_1.default.single('archivo'), bitacorasController_1.default.create);
        this.router.put('/:id', bitacorasController_1.default.update);
        this.router.delete('/:id', bitacorasController_1.default.delete);
    }
}
const bitacorasRoutes = new BitacorasRoutes();
exports.default = bitacorasRoutes.router;
