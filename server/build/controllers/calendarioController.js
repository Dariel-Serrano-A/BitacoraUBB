"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class CalendarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = Array();
            try {
                const [calendario] = yield database_1.default.query('SELECT * FROM calendario'); //consulta sql  
                res.json(calendario);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No hay actividades en el calendario';
                res.json(response);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const response = Array();
            try {
                const [calendario] = yield database_1.default.query('SELECT * FROM calendario WHERE Id = ?', [id]);
                return res.json(calendario);
            }
            catch (error) {
                console.error(error);
                response[0] = false;
                response[1] = 'No hay actividades en el calendario';
                res.json(response);
            }
        });
    }
}
const calendariosController = new CalendarioController();
exports.default = calendariosController;
